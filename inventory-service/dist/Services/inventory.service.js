"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryService = exports.InventoryService = void 0;
const inventory_1 = require("../Models/inventory");
class InventoryService {
    // create one
    async createItem(data) {
        try {
            const newItem = await inventory_1.Inventory.create(data);
            return newItem;
        }
        catch (error) {
            console.log(error);
        }
    }
    // get all
    async getItems() {
        try {
            const items = await inventory_1.Inventory.find({}, { _id: false, __v: false });
            return items;
        }
        catch (error) {
            console.log(error);
        }
    }
    //get one
    async getItem(itemId) {
        try {
            const item = await inventory_1.Inventory.findOne(({ itemId: itemId }), { _id: false, __v: false });
            if (!item) {
                return 'item not found';
            }
            return item;
        }
        catch (error) {
            console.log(error);
        }
    }
    //update inventory
    async updateItem(itemId, data) {
        try {
            const item = await inventory_1.Inventory.findOneAndUpdate({ itemId: itemId }, data, { new: true });
            if (!item) {
                return "item not found";
            }
            return item;
        }
        catch (error) {
            console.log(error);
        }
    }
    //delete inventory
    async deleteItem(itemId) {
        try {
            const item = await inventory_1.Inventory.findOneAndDelete({ itemId: itemId });
            if (!item) {
                return 'item not found';
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.InventoryService = InventoryService;
exports.inventoryService = new InventoryService();
