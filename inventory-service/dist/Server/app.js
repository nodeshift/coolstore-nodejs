"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_config_1 = require("../Config/db.config");
const inventory_routes_1 = require("../Routes/inventory.routes");
//load details from the .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use('/api/v1/inventory', inventory_routes_1.router);
const PORT = process.env.port || 7070;
//db connection then server connection
// TODO: can we change this?  do we need to?
db_config_1.db.then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
