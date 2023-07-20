import {Cart} from "../Models/cart";
import {PromotionService} from "./promotion.service";

export class ShippingService {
  calculateShipping(sc: Cart): void {
    if (sc !== null) {
      if (sc.getCartItemTotal() >= 0 && sc.getCartItemTotal() < 25) {
        sc.setShippingTotal(2.99);
      } else if (sc.getCartItemTotal() >= 25 && sc.getCartItemTotal() < 50) {
        sc.setShippingTotal(4.99);
      } else if (sc.getCartItemTotal() >= 50 && sc.getCartItemTotal() < 75) {
        sc.setShippingTotal(6.99);
      } else if (sc.getCartItemTotal() >= 75 && sc.getCartItemTotal() < 100) {
        sc.setShippingTotal(8.99);
      } else if (sc.getCartItemTotal() >= 100 && sc.getCartItemTotal() < 10000) {
        sc.setShippingTotal(10.99);
      }
    }
  }
}

export const ss = new ShippingService()
