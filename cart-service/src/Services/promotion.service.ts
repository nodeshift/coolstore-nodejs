import {Promotion} from "../Models/promotion";
import {Cart} from "../Models/cart";

export class PromotionService {
    private name: string | null = null;
    private promotionSet: Set<Promotion>;

    constructor() {
        this.promotionSet = new Set<Promotion>();
        this.promotionSet.add(new Promotion("329299", 0.25));
    }

    applyCartItemPromotions(cart: Cart): void {
        if (cart !== null && cart.getCartItemList().length > 0) {
            const promoMap: Map<string, Promotion> = new Map<string, Promotion>();
            for (const promo of this.getPromotions()) {
                promoMap.set(promo.getItemId(), promo);
            }

            for (const sci of cart.getCartItemList()) {
                const productId: string = sci.getProduct().itemId;
                const promo: Promotion | undefined = promoMap.get(productId);
                if (promo !== undefined) {
                    // sci.setPromoSavings(sci.getProduct().getPrice() * promo.getPercentOff() * -1);
                    sci.setPrice(sci.getProduct().price * (1 - promo.getPercentOff()));
                }
            }
        }
    }

    applyShippingPromotions(cart: Cart): void {
        if (cart !== null) {
            // PROMO: if cart total is greater than 75, free shipping
            if (cart.getCartItemTotal() >= 75) {
                cart.setShippingPromoSavings(cart.getShippingTotal() * -1);
                cart.setShippingTotal(0);
            }
        }
    }

    getPromotions(): Set<Promotion> {
        if (this.promotionSet === null) {
            this.promotionSet = new Set<Promotion>();
        }

        return new Set<Promotion>(this.promotionSet);
    }

    setPromotions(promotionSet: Set<Promotion> | null): void {
        if (promotionSet !== null) {
            this.promotionSet = new Set<Promotion>(promotionSet);
        } else {
            this.promotionSet = new Set<Promotion>();
        }
    }

    toString(): string {
        return `PromoService [name=${this.name}, promotionSet=${this.promotionSet}]`;
    }
}

export const ps = new PromotionService()
