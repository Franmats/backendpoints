import config from "../config/config.js"
import mongoose from "mongoose"

export let Users

console.log(`Persistencia con ${config.persistence}`)

switch (config.persistence) {
    case "MONGO":
        mongoose.connect(config.dbUrl,{
            dbName:config.dbName
        })

        const {default: UsersMongo } = await import("./mongoManager/users.js")

        
 
        Users = UsersMongo
       
        break;

    default:

        console.log("Error en factory");
        break;
}