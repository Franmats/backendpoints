
export default class UsersRepository {

    constructor(dao){
        this.dao = dao
    }

    getUsers = async () => { return await this.dao.getUsers()}

    createUser = async (user) =>  {
        return await this.dao.createUser(user)
    }

    updatePoints = async (id,number) => {return await this.dao.updatePoints(id,number)}

    deleteUser = async(id) => { return await this.dao.deleteUser(id)}
}