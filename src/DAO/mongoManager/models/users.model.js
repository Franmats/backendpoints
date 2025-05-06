import mongoose from "mongoose";

const userModel = mongoose.model("users", new mongoose.Schema({
    name: {type:String, required:true},
    password:{type:String, required:true},
    puntos:Number,
}))



export default userModel