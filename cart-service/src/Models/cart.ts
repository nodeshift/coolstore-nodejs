import {CartItem} from "./cartItem";

export class Cart {
    private cartItemTotal: number = 0.0;
    private cartItemPromoSavings: number = 0.0;
    private shippingTotal: number = 0.0;
    private shippingPromoSavings: number = 0.0;
    private cartTotal: number = 0.0;
    private cartId: string;
    private cartItemList: CartItem[] = [];


    constructor(cartId: string) {
        this.cartId = cartId;
    }

    getCartId(): string {
        return this.cartId;
    }

    setCartId(cartId: string): void {
        this.cartId = cartId;
    }

    getCartItemList(): CartItem[] {
        return this.cartItemList;
    }

    setCartItemList(cartItemList: CartItem[]): void {
        this.cartItemList = cartItemList;
    }

    resetCartItemList(): void {
        this.cartItemList = [];
    }

    addCartItem(sci: CartItem): void {
        if (sci != null) {
            this.cartItemList.push(sci);
        }
    }

    removeCartItem(sci: CartItem): boolean {
        const index = this.cartItemList.indexOf(sci);
        if (index !== -1) {
            this.cartItemList.splice(index, 1);
            return true;
        }
        return false;
    }

    getCartItemTotal(): number {
        return this.cartItemTotal;
    }

    setCartItemTotal(cartItemTotal: number): void {
        this.cartItemTotal = cartItemTotal;
    }

    getShippingTotal(): number {
        return this.shippingTotal;
    }

    setShippingTotal(shippingTotal: number): void {
        this.shippingTotal = shippingTotal;
    }

    getCartTotal(): number {
        return this.cartTotal;
    }

    setCartTotal(cartTotal: number): void {
        this.cartTotal = cartTotal;
    }

    getCartItemPromoSavings(): number {
        return this.cartItemPromoSavings;
    }

    setCartItemPromoSavings(cartItemPromoSavings: number): void {
        this.cartItemPromoSavings = cartItemPromoSavings;
    }

    getShippingPromoSavings(): number {
        return this.shippingPromoSavings;
    }

    setShippingPromoSavings(shippingPromoSavings: number): void {
        this.shippingPromoSavings = shippingPromoSavings;
    }
}
