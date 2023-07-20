import  {Request, Response} from "express";
import {cartService} from "../Services/cart.service";
import {CartRequest} from "../Models/cartRequest";


class CartController {

    // create new item
    addItem = async (req: Request, res: Response) => {
        console.log("controller adding Item..")

        let data = new CartRequest(req.body.itemId.toString(),
            req.body.name,
            req.body.price,
            req.body.quantity,
            req.body.product);

        const cartId = req.params.cartId;
        const item = await cartService.addItem(cartId,data);
        res.status(201).send(item)
        }


    removeItem = async (req: Request, res: Response) => {
        let data = new CartRequest(req.body.itemId.toString(),
            req.body.name,
            req.body.price,
            req.body.quantity,
            req.body.product);

        const cartId = req.params.cartId;
        const cart = await cartService.addItem(cartId,data);
        res.send(cart)
    }

    getCart = async (req: Request, res: Response) => {
        const id = req.params.cartId
        const cart = await cartService.getShoppingCart(id)
        res.send(cart)
    }

    checkout = async (req: Request, res: Response) => {
        const id = req.params.cartId
        const cart = await cartService.checkout(id)
        res.send(cart)
    }

}

export const cartController = new CartController()
