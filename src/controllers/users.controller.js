import { generateToken,authToken, isValidPassword, createHash, resetAuth, putPointsOnHistory, authTokenHeader } from "../utils.js";
import { usersService } from "../DAO/repository/index.js";
import config from "../config/config.js";



//MIDLEWARE SEGURIDAD
export const authenticate = async(req,res,next)=> {
    const authHeader = req.headers.authorization;

    req.session = {user:null}

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
     }

     const token = authHeader.split(" ")[1];
    try {
        const decoded = authTokenHeader(token);
        if (!decoded || !decoded.user) {
            return res.status(403).json({ status: 'Acceso no autorizado' });
        }      
        req.session.user = decoded.user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "Fallo en la autenticacion" });
    }

}

//MIDLEWARE DE ESTADO DEL USUARIO
export const auth = async(req,res)=> {
   const authHeader = req.headers.authorization;

    req.session = {user:null}

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
     }

      const token = authHeader.split(" ")[1];
    try {
        const decoded = authTokenHeader(token);
        if (!decoded || !decoded.user) {
            return res.status(403).json({ status: 'Acceso no autorizado' });
        }          
        res.send({status:"success", payload:[]})
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "Fallo en la autenticacion" });
    }

}
//CONTROLLER DE ADMIN
export const getUsers = async(req,res) => {
    const result  = await usersService.getUsers()
    console.log(result)
    if (result) {
        res.send({status:"success", payload:result})
    }else {
        res.send({status:"GetError", payload:[]})
    }
}



export const createUser = async(req,res) => {
    const {name,dni,password,phone,email} = req.body
    try{
        const user = await usersService.getUserInfoByEmail(email)//cambio del metodo de busqueda por email
        if (user){
            console.log("User already exist")
            res.send({status:"User already exist", payload:[]})
        }

        const tipo = ()=> {
            if ((email == "adminFranco@gmail.com") && (password == "backdoor198245.")){
                role="admin"
                return role
            } else {
                role="user"
                return role
            }
        }
        const newUser = {
           name,
            dni,
            phone,
            role: "user",
            puntos:0,
            email,
            password:createHash(password)
        }
        const result = await usersService.createUser({name:newUser.name,
                                                        role: newUser.role,
                                                        email: newUser.email,
                                                        puntos: newUser.puntos,
                                                        dni: newUser.dni,
                                                        phone: newUser.phone,
                                                        password: newUser.password                                                
        })
        if (result) {
            res.send({status:"success", payload:[]})}
    }catch(e){
        console.log(e)
    }
}

export const LogOut = async(req,res) => {
    res.clearCookie('accessToken').json({ status: 'success' });
}
    
export const getPointsForUser = async(req,res) => {
    const user = req.session.user
    try {
        const result = await usersService.getHistoryPoints(user.dni)
        if (result) {
            res.send({ status: "success", payload: result })
        } else {
            res.send({ status: "error" ,payload:[]})
        }
    } catch (error) {
        res.send({ status: "error" })
        
    }
}
export const updatePoints= async(req,res) => {
    const {dni,puntos} = req.body
    try {

        const result2 = putPointsOnHistory(dni, puntos)
        if (result2) {
            res.send({ status: "success" })
        } else {
            res.send({ status: "error" })
        }

    } catch (error) {
        res.send({ status: "error" })
         console.log(error)
    }
       
    }
   



export const loginJWT = async(req,res) => {
    const { email, password } = req.body
    const user = await usersService.getUserInfoByEmail(email)
    if (!user) {
        return res.status(400).json({ status: 'EMail Incorrecto' })
    }
    if (!isValidPassword(user, password)) {
        return res.status(400).json({ status: 'Por favor revisa los datos' })
    }
   
    const userfilter = {name: user.name,
                        email: user.email,
                        puntos: user.puntos,
                        role: user.role,
                        dni: user.dni,
    }

    const token = generateToken(userfilter)

    try {
       res.json({ status: 'success',payload: {token}});
        
    } catch (error) {
        res.json({ status: 'Error 505',payload:[]});
        console.log(error)
        
    }
}
//ACCESO AL PERFIL

export const accessProfile = async(req,res)=> {
    const user = req.session.user;
    if (!user) {
        return res.status(403).json({ status: 'Acceso no autorizado' });
    }

    try {
        const result = await usersService.getUserInfoByEmail(user.email) 
        if (!result) {
            return res.status(403).json({ status: 'Acceso no autorizado' });
        }

        let userFilter = {
            name: result.name,
            email: result.email,
            dni: result.dni,
            phone: result.phone,
            role: result.role,
            puntos: result.puntos,
            pointsHistory: result.pointsHistory
        }
        res.send({ status: 'success', payload: userFilter });
    } catch (error) {
        res.status(401).json({status:"Error",payload:[]});
    }
}

export const authSGI = async(req,res,next)=> {
    const deviceToken = req.headers.tokensgi;
    const DEVICE_SECRET =  config.tokensgi 
    console.log(deviceToken)
    console.log(DEVICE_SECRET)
    if (!deviceToken || deviceToken != DEVICE_SECRET) {
        return res.status(403).json({ error: 'Access denied. Invalid device token.' });
    }

    next();

}

