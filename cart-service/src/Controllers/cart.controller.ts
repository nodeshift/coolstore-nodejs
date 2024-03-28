import  {Request, Response} from "express";
import {cartService} from "../Services/cart.service";
import {CartRequest} from "../Models/cartRequest";

class CartController {

    // create new item
    addItem = async (req: Request, res: Response) => {
        console.log("controller add Item..")
        console.log(req.body);
        const product = req.body.product;

        let data = new CartRequest(product.itemId.toString(),
            product.title,
            product.price,
            req.body.quantity,
            product.itemId);

        const cartId = req.params.cartId;
        const cart = await cartService.addItem(cartId,data);
        res.status(201).send(cart.toDTO())
        }


    removeItem = async (req: Request, res: Response) => {
        console.log("controller remove Item..")

        const cartId = req.params.cartId;
        const itemId = req.params.itemId;
        const cart = await cartService.removeCart(cartId,itemId);
        res.send(cart.toDTO());
    }

    getCart = async (req: Request, res: Response) => {
        console.log("controller get cart..")
        const id = req.params.cartId
        const cart = await cartService.getShoppingCart(id)
        res.send(cart.toDTO());
    }

    getCarts = async (req: Request, res: Response) => {
        console.log("controller get cart..");
        console.log(await cartService.getShoppingCarts());
        res.send(cartService.getShoppingCarts());
    }

    checkout = async (req: Request, res: Response) => {
        console.log("controller checkout..")
        const id = req.params.cartId
        // Send the Order to Kafka
        // Then Checkout
        const cart = await cartService.checkout(id)
        res.send(cart.toDTO())
    }

}

export const cartController = new CartController()
