import { IData } from "../models/IData";

export interface UserServiceInterface {
    getUsers():Promise<IData[]>
    deleteUser(id: string): boolean
}