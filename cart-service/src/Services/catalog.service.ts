import axios from 'axios';

export class CatalogService {

    static async getProducts() {
        try {
            // Needs baseURL
            const response = await axios.get(`http://localhost:7072/api/v1/products`);
            return response.data;
        } catch (error) {
            throw new Error(`Error retrieving catalog items: ${error}`);
        }
    }


    static async getProduct(itemId: string) {
        try {
            // Needs baseURL
            const response = await axios.get(`http://localhost:7072/api/v1/products/${itemId}`);
            return response.data;

        } catch (error) {
            throw new Error(`Error retrieving catalog item: ${error}`);
        }
    }

}


