import {Cart, CartDTO} from "../Models/cart";
import {CartItem} from "../Models/cartItem";
import {CartRequest} from "../Models/cartRequest";
import {ps} from "./promotion.service";
import {ss} from "./shipping.service";
import { createClient } from "redis";

const redisClient = createClient();

redisClient.on('error', (err) => {
    console.log('Error');
    console.log(err);
});

export class CartService {

    carts: Map<string, Cart> = new Map();

    async getShoppingCarts() {
        console.log('Getting all the shopping carts');
        this.carts.forEach((value, key) => {
            console.log(`${key} = ${value}`);
          });
        return this.carts.size;
    }

    async getShoppingCart(cartId: string){
        // Can we checm first if we have a connection?
        await redisClient.connect();
        let redisCart: any = await redisClient.get(cartId);
        let cart;

        // No Cart in the cache
        if (!redisCart) {
            console.log('No Cart in Redis');
            //Create a new Cart object and return that
            cart = new Cart(cartId);
            await redisClient.set(cartId, JSON.stringify(cart));
        } else {
            // Cart in the Cache
            console.log('Yes Cart in Redis');
            cart = new Cart(cartId);
            cart.initFromCart(JSON.parse(redisCart));
        }

        // Old Stuff from in-memory
        // let cart = this.carts.get(cartId)
        // if (cart instanceof Cart) {
        //     this.carts.set(cartId, cart);
        // }
        // else {
        //     cart = new Cart(cartId)
        //     this.carts.set(cartId, cart);
        // }

        this.priceShoppingCart(cart);
        await redisClient.quit();
        return cart;
    }


    async removeCart(cartId: string, itemId: string){
        const cart = await this.getShoppingCart(cartId);
        await redisClient.connect();
        // remove the item from the map
        cart.removeCartItem(itemId);

        // save it back to the cache
        const toSave = JSON.stringify(cart, (key, value) => {
            if (value instanceof Map) {
              return Object.fromEntries(value);
            }
            return value;
          });
        // Save into the cache
        await redisClient.set(cartId, toSave);
        // let cart = await this.getShoppingCart(cartId);
        // if (cart instanceof Cart) {
        //     cart.removeCartItem(itemId);
        // }
        // this.priceShoppingCart(cart);
        await redisClient.quit();
        return cart;
    }

    // "product":{"itemId":"165613","name":"Knit socks","desc":"","price":4.15},"promoSavings":0.0}
    async addItem(cartId: string, item: CartRequest){
        const cart = await this.getShoppingCart(cartId);
        console.log(cart);
        let cartItem = new CartItem(item._itemId, item._name, item._price, item._quantity, 0.0)
        cart.addCartItem(cartItem);

        const toSave = JSON.stringify(cart, (key, value) => {
            if (value instanceof Map) {
              return Object.fromEntries(value);
            }
            return value;
          });
        // Save into the cache
        await redisClient.connect();
        await redisClient.set(cartId, toSave);


        // let cart = await this.getShoppingCart(cartId);
        // let cartItem = new CartItem(item._itemId, item._name, item._price, item._quantity, 0.0)
        // if (cart instanceof Cart) {
        //     console.log(cartItem);
        //     cart.addCartItem(cartItem);
        // }

        this.priceShoppingCart(cart);
        await redisClient.quit();
        return cart;
    }


    async checkout(cartId: string) {
        const cart = await this.getShoppingCart(cartId);
        // cart.removeAllItems();
        // this.priceShoppingCart(cart);
        // this.carts.set(cartId, cart);
        return cart;
    }


    priceShoppingCart(sc: Cart): void {
        ps.applyCartPromotions(sc);
        ss.calculateShipping(sc);

        sc.cartItems.forEach(ci =>{
          sc.cartItemTotal += ((ci.price * ci.quantity) - ci.promoSavings);
          sc.cartItemPromoSavings += ci.promoSavings;
        })

        sc.cartTotal = sc.cartItemTotal - sc.cartItemPromoSavings +(sc.shippingTotal - sc.shippingPromoSavings);

        ss.applyShippingPromotions(sc);

    }
}

export const cartService = new CartService()
