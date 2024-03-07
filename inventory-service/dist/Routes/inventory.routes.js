"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const inventory_controller_1 = require("../Controllers/inventory.controller");
//initiating the router
exports.router = express_1.default.Router();
exports.router.post('/', inventory_controller_1.inventoryController.addItem);
exports.router.get('/', inventory_controller_1.inventoryController.getItems);
exports.router.get('/:id', inventory_controller_1.inventoryController.getItem);
exports.router.put('/:id', inventory_controller_1.inventoryController.updateItem);
exports.router.delete('/:id', inventory_controller_1.inventoryController.deleteItem);
