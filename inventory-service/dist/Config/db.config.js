"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const inventory_1 = require("../Models/inventory");
const fs = __importStar(require("node:fs"));
//load details from the .env file
dotenv_1.default.config();
console.log(process.env);
// These values are populated from the .env file
const username = process.env.username;
const password = process.env.password;
const hostname = process.env.COOLSTORE_DB_SERVICE_HOST || 'localhost';
const dbName = process.env.dbname;
//This is json,  should just be able to require/import it?
const importData = fs.readFileSync(__dirname + '/import.json');
const inventoryData = JSON.parse(importData);
//connection string to mongo local
const connectionString = `mongodb://${username}:${password}@${hostname}/${dbName}`;
const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4 // Use IPv4, skip trying IPv6
};
console.log(connectionString);
//db connection
exports.db = mongoose_1.default.connect(connectionString, options)
    .then(async (res) => {
    if (res) {
        console.log(`Database connection successful to ${dbName}`);
        // Check if there is already values here
        const currentInventory = await inventory_1.Inventory.find({});
        // Only insert new rows if empty
        if (currentInventory.length < 1) {
            await inventory_1.Inventory.insertMany(inventoryData);
            console.log('Cart data imported successfully');
        }
        else {
            console.log(`Using already imported Cart data. Current Rows: ${currentInventory.length}`);
        }
    }
}).catch(err => {
    console.log(err);
    return Promise.reject(err);
});
