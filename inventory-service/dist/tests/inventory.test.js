"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../Server/app");
let apiEndPoint = '/api/v1/inventory';
// TODO: Clear the database before each test
// TODO: Connect to a test MongoDB database
describe('POST ' + apiEndPoint, () => {
    it('should create an inventory item', async () => {
        const inventory = {
            itemId: '1',
            location: 'Raliegh',
            quantity: 736,
            link: 'http://maps.google.com/?q=Raleigh',
        };
        const response = await (0, supertest_1.default)(app_1.app)
            .post(apiEndPoint)
            .send(inventory)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.itemId).toBe(inventory.itemId);
        expect(response.body.quantity).toBe(inventory.quantity);
    });
});
describe('PUT ' + apiEndPoint + '/:id', () => {
    it('should update quantity', async () => {
        const itemId = '1'; // Specify the item ID to update
        const inventory = {
            itemId: '1',
            location: 'Raliegh',
            quantity: 25000,
            link: 'http://maps.google.com/?q=Raleigh',
        };
        const response = await (0, supertest_1.default)(app_1.app)
            .put(apiEndPoint + `/${itemId}`)
            .send(inventory)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.itemId).toBe(inventory.itemId);
        expect(response.body.quantity).toBe(inventory.quantity);
    });
});
describe('DELETE ' + apiEndPoint + '/:id', () => {
    it('should delete a inventory item', async () => {
        const itemId = '1'; // Specify the item ID to delete
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(apiEndPoint + `/${itemId}`)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'inventory item deleted');
    });
});
