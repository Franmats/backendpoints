import UsersModel from "./models/users.model.js"

export default class Product {

    getUsers = async () => { return await UsersModel.find()}

   
    createUser = async (user) =>  { return await  UsersModel.create(user)}

    updatePoints = async (id,number) => {return await UsersModel.updateOne({_id:id},{$set:{puntos:number}})}

    deleteUser = async(id) => { return await UsersModel.deleteOne({_id:id})}

}