
export default class PromosRepository {

    constructor(dao){
        this.dao = dao
    }
    //metodos privados
    getPromos = async () => { return await this.dao.getPromos()}

    createPromo = async (promo) => { return await this.dao.createPromo(promo)}

    
}