import {Cart} from "../Models/cart";
import {Product} from "../Models/product";
import {CatalogService} from "./catalog.service";
import {CartItem} from "../Models/cartItem";


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
        return cart;
    }

    async removeCart(cartId: string, item: CartItem){

    }

    async addItem(cartId: string, item: CartItem){
    }

    async checkout(cartId: string){

    }
}

export const inventoryService = new CartService()
