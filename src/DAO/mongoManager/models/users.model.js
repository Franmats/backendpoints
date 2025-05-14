import mongoose from "mongoose";

const userModel = mongoose.model("users", new mongoose.Schema({
    name: {type:String, required:true},
    email:{type:String, required:true},
    dni:Number,
    phone:Number,
    role:{type:String, required:true},
    password:{type:String, required:true},
    puntos:Number,
    pointsHistory: [{
        date: String,
        amount: Number
      }]
}))



export default userModel