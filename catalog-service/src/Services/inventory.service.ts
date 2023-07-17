import axios from 'axios';

export class InventoryService {

    static async getInventoryItem(itemId: string) {
        try {
            // Needs baseURL
            const response = await axios.get(`/api/v2/inventory/${itemId}`);
            const inventoryItem = response.data;
            return inventoryItem;
        } catch (error) {
            throw new Error(`Error retrieving inventory item: ${error}`);
        }
    }


}
