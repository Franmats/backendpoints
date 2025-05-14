import { promosService } from "../DAO/repository/index.js";
//CONTROLLER DE ADMIN
export const getPromos = async(req,res) => {
    const result  = await promosService.getPromos()
    console.log(result)
    if (result) {
        res.send({status:"success", payload:result})
    }else {
        res.send({status:"GetError", payload:[]})
    }
}
export const createPromo = async(req,res) => {
    

     try {
        const file = req.file;
        const {name, description} = req.body;
        console.log(file, name,description)
    
        if (!file || !name || !description) {
          return res.status(400).json({ error: "Falta imagen o Name o Description" });
        }
        const imageUrl = `http://localhost:8080/uploads/${file.filename}`;
        const promo = {
          name,
          description,
          image: imageUrl,
        }
        console.log("000000",promo)
        const result = await promosService.createPromo(promo)
        if(result) {
          res.send({ status: "success", payload: {satus:"Imagen Subida"} });
        }
        else {
          res.send({ status: "error al enviar", payload: {status:"Error en el proceso subir imagen"} });
        }

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al subir imagen" });
      }
}