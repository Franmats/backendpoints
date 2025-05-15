//Librerias y FrameWorks
import express from "express"
import cors from "cors"
import path from "path"
import config from "./config/config.js"
import cookieParser from "cookie-parser"
import {fileURLToPath} from 'url'
//Rutas
import routerUsers from "./routes/users.router.js"
import routerPromos from "./routes/promos.router.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors({credentials: true,methods:["GET","POST","PUT","DELETE"],allowedHeaders: ['Content-Type', 'Authorization'], origin: "http://localhost:5173"}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());


//Rutas Principales
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/",routerUsers)
app.use("/promos",routerPromos)


//Apertura de Servidor
app.listen(config.port,()=>{console.log("listen")})