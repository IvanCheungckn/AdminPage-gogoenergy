import { Request, Response } from "express";

export interface UserRouterInterface{
    getUsers(req: Request, res: Response):void;
    deleteUser(req: Request, res: Response):void;
}