import {Users,Promos} from "../factory.js";

import UsersRepository from "./users.repository.js"
import PromosRepository from "./promos.repository.js"
export const usersService = new UsersRepository(new Users())
export const promosService = new PromosRepository(new Promos())
