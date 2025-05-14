import promosModel from "./models/promos.model.js"

export default class Promo {
    //metodos privados
    getPromos = async () => { return await promosModel.find()}
    createPromo = async (promo) => { return await promosModel.create(promo)}
    
    
}