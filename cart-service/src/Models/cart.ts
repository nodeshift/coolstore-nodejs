//importing modules
import {model, Schema,} from 'mongoose'
import Joi from 'joi'


export interface ICart{
    itemId: string;
    location: string;
    quantity: number;
    link: string;
}


