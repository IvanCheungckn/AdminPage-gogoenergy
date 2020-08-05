import { IUser } from "../../models/IUser"

// action creator
export function loadUsersAction(users: IUser[]) {
    return {
        type: '@@USER/LOAD_USERS' as '@@USER/LOAD_USERS',
        users
    }
}
export function deleteUserAction(id:string) {
    return {
        type: '@@USER/DELETE_USER' as '@@USER/DELETE_USER',
        id
    }
}

export type UserActions = ReturnType<typeof loadUsersAction> 
                            | ReturnType<typeof deleteUserAction>