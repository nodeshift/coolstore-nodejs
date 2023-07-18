import express from "express";
import {cartController} from "../Controllers/cart.controller";

//initiating the router
export const router = express.Router()

//add item
router.put('/',cartController.addItem)

//get cart
router.get('/:id', cartController.getCart)

//checkout
router.post('/:id', cartController.checkout)

//delete a post
router.delete('/:id', cartController.removeItem)
