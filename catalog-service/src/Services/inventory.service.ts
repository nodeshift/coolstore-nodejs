import axios from 'axios';

export class InventoryService {

    static async getInventoryItem(itemId: string) {
        const inventoryServiceHost = process.env.INVERNTORY_SERVICE_HOST || 'localhost'
        try {
            // Needs baseURL
            //TODO: needs to be configurabe
            //TODO: lets switch to fetch and remove a dep
            const response = await axios.get(`http://${inventoryServiceHost}:8080/api/v1/inventory/${itemId}`);
            const inventoryItem = response.data;
            return inventoryItem;
        } catch (error) {
            throw new Error(`Error retrieving inventory item: ${error}`);
        }
    }


}
