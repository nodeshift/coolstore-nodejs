export class CartRequest {

        constructor(itemId: string, name: string, price: number, quantity: number, product: string) {
                this._itemId = itemId;
                this._name = name;
                this._price = price;
                this._quantity = quantity;
                this._product = product;
        }

        private _itemId: string;
        private _name: string;
        private _price: number;
        private _quantity: number;
        private _product: string;


        get itemId(): string {
                return this._itemId;
        }

        set itemId(value: string) {
                this._itemId = value;
        }

        get name(): string {
                return this._name;
        }

        set name(value: string) {
                this._name = value;
        }

        get price(): number {
                return this._price;
        }

        set price(value: number) {
                this._price = value;
        }

        get quantity(): number {
                return this._quantity;
        }

        set quantity(value: number) {
                this._quantity = value;
        }

        get product(): string {
                return this._product;
        }

        set product(value: string) {
                this._product = value;
        }
}
