import { UserRouterInterface } from "./UserRouterInterface";
import express, { Response, Request } from 'express'
import { UserServiceInterface } from "../services/UserServiceInterface";
import { IData } from "../models/IData";
export class UserRouter implements UserRouterInterface{

    constructor(private userService: UserServiceInterface){}

    router() {
        const router = express.Router();
        router.get('/', this.getUsers)
        router.delete('/:id', this.deleteUser)
        return router
    }

    getUsers = async (req: Request, res: Response) => {
        try{
            const users: IData[] = await this.userService.getUsers()
            res.status(200).json({success:true, message:users})
            return;
        } catch (e){
            console.log("[UserRouter] getUsers Error")
            console.log(e)
            res.status(500).json({success:false, message:"Internal Error"})
        }
    }

    deleteUser =  (req:Request, res: Response) => {
        try {
            const id = req.params.id;
            const isDeleted = this.userService.deleteUser(id);
            if (isDeleted){
                res.status(200).json({success:true, message:true})
                return;
            }else{
                res.status(400).json({success:false, message:"Delete User Unsuccessful"})
                return;
            }
        } catch (e){
            console.log("[UserRouter] deleteUser Error")
            console.log(e)
            res.status(500).json({success:false, message:"Internal Error"})
        }
    }
}