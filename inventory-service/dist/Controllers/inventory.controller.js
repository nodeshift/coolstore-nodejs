"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryController = void 0;
const inventory_service_1 = require("../Services/inventory.service");
const inventory_1 = require("../Models/inventory");
class InventoryController {
    // create new item
    addItem = async (req, res) => {
        //data to be saved in database
        const data = {
            itemId: req.body.itemId.toString(),
            location: req.body.location,
            quantity: req.body.quantity,
            link: req.body.link
        };
        //validating the request
        const { error, value } = inventory_1.InventorySchemaValidate.validate(data);
        if (error) {
            res.send(error.message);
        }
        else {
            //call the create item function in the service and pass the data from the request
            const post = await inventory_service_1.inventoryService.createItem(value);
            res.status(201).send(post);
        }
    };
    // get all
    getItems = async (req, res) => {
        const items = await inventory_service_1.inventoryService.getItems();
        res.send(items);
    };
    // get one
    getItem = async (req, res) => {
        //get id from the parameter
        const id = req.params.id;
        const item = await inventory_service_1.inventoryService.getItem(id);
        res.send(item);
    };
    //update item
    updateItem = async (req, res) => {
        const id = req.params.id;
        const item = await inventory_service_1.inventoryService.updateItem(id, req.body);
        res.send(item);
    };
    //delete item
    deleteItem = async (req, res) => {
        const id = req.params.id;
        try {
            await inventory_service_1.inventoryService.deleteItem(id);
            const message = {
                status: 'success',
                message: 'inventory item deleted',
                itemId: id,
            };
            res.status(200).json(message);
        }
        catch (error) {
            // Handle the error
            console.error('Error deleting inventory:', error);
            const errorMessage = {
                status: 'error',
                message: 'Failed to delete inventory',
            };
            res.status(500).json(errorMessage);
        }
    };
}
/*  NOTE: If IInventory was extending a Document a mapper would be required for loc->Location and back.
const mapFields = (data: any): any => {
    const mappedData = {
        ...data,
        loc: data.location, // Map 'location' to 'loc'
    };
    delete mappedData.location;
    return mappedData;
};

const validateAndMapFields = (data: any) => {
    const { error, value } = InventorySchemaValidate.validate(data);
    if (error) {
        // Handle validation error
        throw error;
    }
    return mapFields(value);
};
*/
exports.inventoryController = new InventoryController();
