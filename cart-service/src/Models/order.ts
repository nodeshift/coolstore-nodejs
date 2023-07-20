import {CreditCard} from "./creditCard";

export class Order {
    private orderId: string | null = null;
    private total: string | null = null;
    private creditCard: CreditCard | null = null;
    private billingAddress: string | null = null;
    private name: string | null = null;

    constructor(
        orderId: string,
        total: string,
        creditCard: CreditCard,
        billingAddress: string,
        name: string
    ) {
        this.orderId = orderId;
        this.total = total;
        this.creditCard = creditCard;
        this.billingAddress = billingAddress;
        this.name = name;
    }

    getOrderId(): string | null {
        return this.orderId;
    }

    setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    getTotal(): string | null {
        return this.total;
    }

    setTotal(total: string): void {
        this.total = total;
    }

    getCreditCard(): CreditCard | null {
        return this.creditCard;
    }

    setCreditCard(creditCard: CreditCard): void {
        this.creditCard = creditCard;
    }

    getBillingAddress(): string | null {
        return this.billingAddress;
    }

    setBillingAddress(billingAddress: string): void {
        this.billingAddress = billingAddress;
    }

    getName(): string | null {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
}
