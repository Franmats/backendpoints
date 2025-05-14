import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from './config/config.js'
import { usersService } from './DAO/repository/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PRIVATE_KEY = config.privateKey

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password) // true o false
}

// JWT Generamos el token
export const generateToken = (user) => {
    const token = jwt.sign( {user}, PRIVATE_KEY, {expiresIn: '24h'})

    return token
}

// JWT Extraemos el token del header
export const authToken = (req, res, next) => {

    // Buscamos el token en el header o en la cookie
    let authHeader = req.headers.auth
    if(!authHeader) {
      authHeader = req.cookies['TokenForJWT'] 
      if(!authHeader) {
        return res.status(401).send({
            error: 'Not auth'
        })
      }
    }

    // Verificamos y desencriptamos la informacion 
    const token = authHeader
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: 'Not authroized'})

        req.user = credentials.user
        next()
    })
}

export const authTokenCookie = (token) => {

    const verify = jwt.verify(token, PRIVATE_KEY)
    console.log(verify)
    if(!verify) return false
    return verify
}

//Auth Token Para restablecer la contraseña

export const resetAuth = async(token) => {
    const verify = jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return false

        
        return credentials.user
    })

    return verify
}


export const authorization = role => {

    return async(req, res, next) => {
        const user = req.user
        if(!user) return res.status(401).send({error: 'Unauthorized'})
        if(user.user.role != role) return res.status(403).send({error: 'No permission'})

        return next()
    }

}

export const putPointsOnHistory = async (dni, points) => {
    const date = new Date()
    const dateString = date.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(',', '')
    let user1 = await usersService.getUserByDni(dni)
    let userpoints = user1.puntos
    userpoints =-1*(userpoints - points)
    console.log(userpoints)
    const history = {
        date: dateString,
        amount: userpoints
    }


    const result = await usersService.updateHistoryPoints(dni, history)
    if(result) {
        const result2  = await usersService.updatePoints(dni,points)
        console.log("se actualizaron los datos en el history",result2)
        return true
    } else {
        return false
    }
}

export default __dirname