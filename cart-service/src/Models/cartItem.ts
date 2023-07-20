export class CartItem {
    price: number;
    quantity: number;
    itemId: string;
    promoSavings: number;

    constructor(itemId: string, price: number, quantity: number, promoSavings: number) {
        this.price = price;
        this.quantity = quantity;
        this.promoSavings = promoSavings;
        this.itemId = itemId;
    }

}
