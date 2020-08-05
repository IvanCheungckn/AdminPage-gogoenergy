import { IUser } from "../../models/IUser";
import { UserActions } from "./actions";


export interface UserState {
    users: {
        [id: string]: IUser
    }
}
// immutability

const initialState: UserState = {
    users: {},
}
export const usersReducer = /* reducer */ (oldState = initialState, action: UserActions) => {
    switch (action.type) {
        case '@@USER/LOAD_USERS':
            {
                const newUsers = { ...oldState.users };

                for (let user of action.users) {
                    newUsers[user.id] = user;
                }

                return {
                    ...oldState,
                    users: newUsers
                };
            }
        case '@@USER/DELETE_USER':
            {
                const newUsers = { ...oldState.users };
                
                delete newUsers[action.id]

                return {
                    ...oldState,
                    users: newUsers
                };
            }
        default:
            return oldState;
    }
}
