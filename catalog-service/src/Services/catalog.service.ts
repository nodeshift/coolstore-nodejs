import {Catalog} from "../Models/catalog";
import {InventoryService} from "./inventory.service";

export class CatalogService {


    // get all
    async getItems() {
        try {
            const items = await Catalog.find({})

            return items

        } catch (error) {
            console.log(error)
        }
    }

    //get one
    async getItem(itemId: string) {
        console.log("calling getItem with "+itemId)
        try {
            const item = await Catalog.findOne(({ itemId: itemId }), {_id: false, __v: false} )
            if (!item) {
                return 'item not found'
            }
            InventoryService.getInventoryItem(item.itemId)
                .then((inventoryItem) => {
                    console.log('Inventory item:', inventoryItem.quantity);
                    item.quantity = inventoryItem.quantity;
                })
                .catch((error) => {
                    console.error(error);
                });


            return item;

        } catch (error) {
            console.log(error)
        }
    }

}

export const catalogService = new CatalogService()
