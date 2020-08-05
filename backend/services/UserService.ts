import { UserServiceInterface } from "./UserServiceInterface";
import fetch from 'node-fetch'
import { IData } from "../models/IData";

export class UserService implements UserServiceInterface{
    private deletedUserList: string[] = [];
    getUsers = async () => {
        const resJson = await fetch("https://dummyapi.io/data/api/user?limit=50", {
            headers: {
                "app-id": "OjZNynzgIPpemOEHtFfy"
            }
        });
        const result = await resJson.json();
        const filteredResult = result.data.filter((user: IData) => !this.deletedUserList.includes(user.id));
        return filteredResult
    }

    deleteUser = (id: string) => {
        this.deletedUserList.push(id);
        return true;
    }
}