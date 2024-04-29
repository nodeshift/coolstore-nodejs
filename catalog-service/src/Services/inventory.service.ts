export class InventoryService {

    static async getInventoryItem(itemId: string) {
        const inventoryServiceHost = process.env.INVENTORY_SERVICE_HOST || 'localhost'
        try {
            // Needs baseURL
            //TODO: needs to be configurabe
            const baseURL = `http://${inventoryServiceHost}:8080/api/v1/inventory/${itemId}`;

            const response = await fetch(baseURL);
            const inventoryItem = await response.json();
            return inventoryItem;
        } catch (error) {
            throw new Error(`Error retrieving inventory item: ${error}`);
        }
    }


}
