//Librerias y FrameWorks
import express from "express"
import cors from "cors"
import config from "./config/config.js"

//Rutas
import routerUsers from "./routes/users.router.js"


const app = express()
app.use(cors({credentials: true,methods:["GET","POST","PUT","DELETE"],allowedHeaders: ['Content-Type', 'Authorization']}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//Rutas Principales
app.use("/",routerUsers)



//Apertura de Servidor
app.listen(config.port,()=>{console.log("listen")})