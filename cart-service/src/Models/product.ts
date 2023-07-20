export class Product {
    itemId: string;
    name: string;
    desc: string;
    price: number;

    constructor(itemId: string, name: string, desc: string, price: number) {
        this.itemId = itemId;
        this.name = name;
        this.desc = desc;
        this.price = price;
    }
}
