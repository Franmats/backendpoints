import mongoose from "mongoose";

const promosModel = mongoose.model("promos", new mongoose.Schema({
   name: String, 
   description: String,
   image: String,
}))



export default promosModel