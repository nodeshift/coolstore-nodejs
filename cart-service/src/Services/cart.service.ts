import {Cart} from "../Models/cart";
import {CartItem} from "../Models/cartItem";
import {CatalogService} from "./catalog.service";
import {CartRequest} from "../Models/cartRequest";
import {ss} from "./shipping.service";
import {ps} from "./promotion.service";


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

    priceShoppingCart(sc: Cart): void {
        if (sc !== null) {

            if (sc.getCartItemList() !== null && sc.getCartItemList().length > 0) {
                ps.applyCartItemPromotions(sc);

                for (const sci of sc.getCartItemList()) {
                    // sc.setCartItemPromoSavings(sc.getCartItemPromoSavings() + sci.getPromoSavings() * sci.getQuantity());
                    sc.setCartItemTotal(sc.getCartItemTotal() + sci.getPrice() * sci.getQuantity());
                }

                ss.calculateShipping(sc);
            }
            else{
                sc.cartItemTotal = 0;
                sc.cartItemPromoSavings = 0;
                sc.shippingTotal = 0;
                sc.shippingPromoSavings = 0;
                sc.cartTotal = 0;
            }

            ps.applyShippingPromotions(sc);
            sc.setCartTotal(sc.getCartItemTotal() + sc.getShippingTotal());
        }
    }

    /*
    *         List<CartItem> toRemoveList = new ArrayList<>();

        Cart cart = getShoppingCart(cartId);

        cart.getCartItemList().stream()
                .filter(sci -> sci.getProduct().getItemId().equals(itemId))
                .forEach(sci -> {
                    if (quantity >= sci.getQuantity()) {
                        toRemoveList.add(sci);
                    } else {
                        sci.setQuantity(sci.getQuantity() - quantity);
                    }
                });

        toRemoveList.forEach(cart::removeCartItem);
        priceShoppingCart(cart);
        carts.put(cartId, cart);
    * */


    async removeCart(cartId: string, item: CartRequest){
        let cart = await this.getShoppingCart(cartId);
        let cartItemList = cart.getCartItemList();
        let toRemoveList: CartItem[] = [];

        cartItemList.filter((sci) => sci.getProduct().itemId === item.itemId)
            .forEach((sci) => {
                if (item.quantity >= sci.getQuantity()) {
                    toRemoveList.push(sci);
                } else {
                    sci.setQuantity(sci.getQuantity() - item.quantity);
                }
            });

        toRemoveList.forEach((sci) => cart.removeCartItem(sci));
        this.priceShoppingCart(cart);
        this.carts.set(cartId, cart);
        return cart;


    }

    // "product":{"itemId":"165613","name":"Knit socks","desc":"","price":4.15},"promoSavings":0.0}
    async addItem(cartId: string, item: CartRequest){
        console.log(item.quantity);
        let cart = await this.getShoppingCart(cartId);
        const product = await CatalogService.getProduct(item.itemId);
        let cartItem = new CartItem(product, item.price, item.quantity, 0.0)
        if (cart instanceof Cart) {
            console.log(cartItem);
            cart.addCartItem(cartItem);
        }

        this.priceShoppingCart(cart);
        return cart;
    }

    async checkout(cartId: string) {
        const cart = await this.getShoppingCart(cartId);
        cart.resetCartItemList();
        this.priceShoppingCart(cart);
        this.carts.set(cartId, cart);
        return cart;
    }

}

export const cartService = new CartService()
