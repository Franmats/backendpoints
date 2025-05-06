import {usersService} from "../DAO/repository/index.js"
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
    const {name, puntos, password} = req.body
    const user = {
        name,
        password,
        puntos
    }
    const result  = await usersService.createUser(user)

    console.log(result)
    if (result) {
        res.send({status:"success", payload:result})
    }else {
        res.send({status:"GetError", payload:[]})
    }
}

export const updatePoints= async(req,res) => {
    const {id,puntos} = req.body
  
    const result  = await usersService.updatePoints(id,puntos)

    console.log(result)
    if (result) {
        res.send({status:"success", payload:result})
    }else {
        res.send({status:"GetError", payload:[]})
    }
}
