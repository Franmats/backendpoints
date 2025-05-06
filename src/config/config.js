import dotenv from "dotenv"

dotenv.config()

/* console.log(dotenv.config()); */
export default {
    persistence: process.env.PERSISTENCE,
    port:process.env.PORT,
    dbUrl:process.env.DBURL,
    dbName:process.env.DBNAME,
    privateKey:process.env.PRIVATE_KEY

}