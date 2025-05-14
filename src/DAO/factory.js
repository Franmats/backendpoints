import config from "../config/config.js"
import mongoose from "mongoose"

export let Users
export let Promos

console.log(`Persistencia con ${config.persistence}`)

switch (config.persistence) {
    case "MONGO":
        mongoose.connect(config.dbUrl,{
            dbName:config.dbName
        })

        const {default: UsersMongo } = await import("./mongoManager/users.js")
        const {default: PromosMongo } = await import("./mongoManager/promos.js")

        
 
        Users = UsersMongo
        Promos = PromosMongo
       
        break;

    default:

        console.log("Error en factory");
        break;
}