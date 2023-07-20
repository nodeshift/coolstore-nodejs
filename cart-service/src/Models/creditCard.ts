export class CreditCard {
    private number: string | null = null;
    private expiration: string | null = null;
    private nameOnCard: string | null = null;

    constructor(number: string, expiration: string, nameOnCard: string) {
        this.number = number;
        this.expiration = expiration;
        this.nameOnCard = nameOnCard;
    }

    getNumber(): string | null {
        return this.number;
    }

    setNumber(number: string): void {
        this.number = number;
    }

    getExpiration(): string | null {
        return this.expiration;
    }

    setExpiration(expiration: string): void {
        this.expiration = expiration;
    }

    getNameOnCard(): string | null {
        return this.nameOnCard;
    }

    setNameOnCard(nameOnCard: string): void {
        this.nameOnCard = nameOnCard;
    }
}
