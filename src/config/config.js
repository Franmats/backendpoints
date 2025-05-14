import dotenv from "dotenv"


dotenv.config()

export default {
    persistence: process.env.PERSISTENCE,
    port:process.env.PORT,
    dbUrl:process.env.DBURL,
    dbName:process.env.DBNAME,
    privateKey:process.env.PRIVATE_KEY,
    tokensgi:process.env.TOKEN_SGI,
    apikey:process.env.APIKEY,
    authDomain:process.env.AUTHDOMAIN,
    projectId:process.env.PROJECTID,
    storageBucket:process.env.STORAGEBUCKET,
    messagingSenderId:process.env.MESSAGINGSENDERID,
    appId:process.env.APPID,
    measurementId:process.env.MEASUREMENTID,
}