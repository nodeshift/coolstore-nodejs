//importing modules
import  {Schema, model,} from 'mongoose'
import Joi from 'joi'

//validation schema
export const InventorySchemaValidate = Joi.object({
    itemId: Joi.string().required(),
    location: Joi.string().required(),
    quantity: Joi.number().required(),
    link: Joi.string().required(),

})


interface IInventory {
    itemId: string,
    location: string,
    quantity: number,
    link: string,
}

const inventorySchema = new Schema<IInventory>({

    itemId: {
        type: String,
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

})

export const Inventory = model<IInventory>('Inventory', inventorySchema)
