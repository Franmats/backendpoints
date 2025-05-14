import UsersModel from "./models/users.model.js"

export default class Product {
    //metodos privados
    getUsers = async () => { return await UsersModel.find()}
    updatePoints = async (dni_,number) => {return await UsersModel.updateOne({dni:dni_},{$set:{puntos:number}})}
    deleteUser = async(id) => { return await UsersModel.deleteOne({_id:id})}


    

    //PUNTOS

    updateHistoryPoints = async (dni_,data) => {return await UsersModel.updateOne({dni:dni_},{$push:{pointsHistory:data}})}
    getHistoryPoints = async (dni_) => {return await UsersModel.findOne({dni:dni_},{pointsHistory:1})}
    getUserByDni = async (dni_) => {return await UsersModel.findOne({dni:dni_})}
    

    // USUARIOS 
    createUser = async (user) =>  { return await  UsersModel.create(user)}
    getUserInfoByEmail = async (data) => {return await UsersModel.findOne({email:data})}

    getUserById = async (id) => {return await UsersModel.findOne({_id:id})}
    updateEmail = async (id,email) => {return await UsersModel.updateOne({_id:id},{$set:{email:email}})}



}