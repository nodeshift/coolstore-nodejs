import {Cart, CartDTO} from "../Models/cart";
import {CartItem} from "../Models/cartItem";
import {CartRequest} from "../Models/cartRequest";
import {ps} from "./promotion.service";
import {ss} from "./shipping.service";


export class CartService {

    carts: Map<string, Cart> = new Map();

    async getShoppingCart(cartId: string){
        let cart = this.carts.get(cartId)
        if (cart instanceof Cart) {
            this.carts.set(cartId, cart);
        }
        else {
            cart = new Cart(cartId)
            this.carts.set(cartId, cart);
        }
        this.priceShoppingCart(cart);
        return cart;
    }


    async removeCart(cartId: string, item: CartRequest){
        let cart = await this.getShoppingCart(cartId);
        let cartItem = new CartItem(item._itemId, item._price, item._quantity, 0.0)
        if (cart instanceof Cart) {
            cart.removeCartItem(cartItem);
        }
        this.priceShoppingCart(cart);
        return cart;
    }

    // "product":{"itemId":"165613","name":"Knit socks","desc":"","price":4.15},"promoSavings":0.0}
    async addItem(cartId: string, item: CartRequest){
        let cart = await this.getShoppingCart(cartId);
        let cartItem = new CartItem(item._itemId, item._price, item._quantity, 0.0)
        if (cart instanceof Cart) {
            console.log(cartItem);
            cart.addCartItem(cartItem);
        }
        this.priceShoppingCart(cart);
        return cart;
    }


    async checkout(cartId: string) {
        const cart = await this.getShoppingCart(cartId);
        cart.removeAllItems();
        this.priceShoppingCart(cart);
        this.carts.set(cartId, cart);
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
