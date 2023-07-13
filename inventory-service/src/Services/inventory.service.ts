import {Inventory} from "../Models/inventory";

export class InventoryService {

    // create one
    async createItem(data: any){
        try {
            const newItem = await Inventory.create(data)
            return newItem

        } catch (error) {
            console.log(error)
        }
    }

    // get all
    async getItems() {
        try {
            const items = await Inventory.find({})
            return items

        } catch (error) {
            console.log(error)
        }
    }

    //get one
    async getItem(id: string) {

        try {
            const item = await Inventory.findById({_id:id})
            if (!item) {
                return 'item not found'
            }
            return item

        } catch (error) {
            console.log(error)
        }
    }

    //update inventory
    async updateItem(id: string, data: any) {
        try {
            const item = await Inventory.findByIdAndUpdate({_id:id}, data, {new: true})
            if(!item){
                return "item not found"
            }
            return item
        } catch (error) {
            console.log(error)
        }
    }

    //delete inventory
    async deleteItem(id: string) {
        try {
            const item = await Inventory.findByIdAndDelete(id)
            if (!item) {
                return 'item not found'
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export const inventoryService = new InventoryService()
