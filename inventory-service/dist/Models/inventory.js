"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = exports.InventorySchemaValidate = void 0;
//importing modules
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
//validation schema
exports.InventorySchemaValidate = joi_1.default.object({
    itemId: joi_1.default.string().required(),
    location: joi_1.default.string(),
    quantity: joi_1.default.number(),
    link: joi_1.default.string(),
});
const inventorySchema = new mongoose_1.Schema({
    itemId: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    link: {
        type: String,
    },
});
/* NOTE: If IInventory was extending a Document a mapper would be required for loc->Location and back.
inventorySchema.set('toJSON', {

    transform: function (doc, ret, options) {
        ret.location = ret.loc; // Map 'loc' to 'location' in JSON response
        delete ret.loc;
        delete ret._id;
        delete ret.__v;
    },
});
 */
exports.Inventory = (0, mongoose_1.model)('Inventory', inventorySchema);
