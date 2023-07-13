import express from "express";
import {inventoryController} from "../Controllers/inventory.controller";

//initiating the router
export const router = express.Router()

//add post route
router.post('/',inventoryController.addItem)

//get posts
router.get('/', inventoryController.getItems)

//get single post
router.get('/:id', inventoryController.getItem)

//update a post
router.put('/:id', inventoryController.updateItem)

//delete a post
router.delete('/:id', inventoryController.deleteItem)
