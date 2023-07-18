import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {Inventory} from "../Models/inventory";
const fs = require('fs');

dotenv.config()

//details from the env
const username = process.env.username
const password = process.env.password
const hostname = process.env.hostname
const dbName   = process.env.dbname
const importData = fs.readFileSync(__dirname + '/import.json');
const inventoryData = JSON.parse(importData);

//connection string to mongo local
const connectionString = `mongodb://${username}:${password}@${hostname}/${dbName}`

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

console.log(connectionString)
//db connection
export const db = mongoose.connect(connectionString, options)
    .then(res => {
        if(res){
            console.log(`Database connection successful to ${dbName}`)

            Inventory.insertMany(inventoryData)
                .then(() => {
                    console.log('Cart data imported successfully');
                })
        }

    }).catch(err => {
        console.log(err)
    })

