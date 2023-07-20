export class Promotion {
    private itemId: string;
    private percentOff: number;

    constructor(itemId: string, percentOff: number) {
        this.itemId = itemId;
        this.percentOff = percentOff;
    }

    getItemId(): string {
        return this.itemId;
    }

    setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    getPercentOff(): number {
        return this.percentOff;
    }

    setPercentOff(percentOff: number): void {
        this.percentOff = percentOff;
    }
}
