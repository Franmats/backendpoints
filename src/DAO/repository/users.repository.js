
export default class UsersRepository {

    constructor(dao){
        this.dao = dao
    }
    //metodos privados
    getUsers = async () => { return await this.dao.getUsers()}
    updatePoints = async (id,number) => {return await this.dao.updatePoints(id,number)}
    deleteUser = async(id) => { return await this.dao.deleteUser(id)}
    createUser = async (user) =>  {
        return await this.dao.createUser(user)
    }
    getUserByDni = async (dni_) => {return await this.dao.getUserByDni(dni_)}
    //PUNTOS
    updateHistoryPoints = async (dni_,data) => {return await this.dao.updateHistoryPoints(dni_,data)}
    getHistoryPoints = async (dni_) => {return await this.dao.getHistoryPoints(dni_)}
    //USUARIOS
    getUserById = async (id) => {return await this.dao.getUserById(id)}
    updateEmail = async (id,email) => {return await this.dao.updateEmail(id,email)}
    //Login
    getUserInfoByEmail = async (data) => {return await this.dao.getUserInfoByEmail(data)}
    
}