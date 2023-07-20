import {Product} from "./product";

export class CartItem {
    price: number;
    quantity: number;
    product: Product;
    promoSavings: number;

    constructor(product: Product, price: number, quantity: number, promoSavings: number) {
        this.price = price;
        this.quantity = quantity;
        this.promoSavings = promoSavings;
        this.product = product;
    }

    getProduct(): Product {
        return this.product;
    }

    setProduct(product: Product): void {
        this.product = product;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        this.price = price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    getPromoSavings(): number {
        return this.promoSavings;
    }

    setPromoSavings(promoSavings: number): void {
        this.promoSavings = promoSavings;
    }
}
