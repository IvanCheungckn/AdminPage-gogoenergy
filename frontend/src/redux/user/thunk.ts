import { ThunkDispatch, RootState } from "../../store";
import { deleteUserAction, loadUsersAction } from "./actions";



// Thunk Action
export function fetchAllUsers() {
    return async (dispatch: ThunkDispatch, getState:()=>RootState) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
            const result = await res.json();
            console.log(result)
            if (result.success) {
                dispatch(loadUsersAction(result.message));
            } else {
                window.alert(result.message);
            }
        } catch (e) {
            window.alert(e.message);
        }
    }
}

export function deleteUser(id: string) {
    return async (dispatch: ThunkDispatch, getState:()=>RootState) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`, {
                method: 'DELETE'
                })        
            const result = await res.json();
            if (result.success) {
                dispatch(deleteUserAction(id));
            } else {
                window.alert(result.message);
            }
        } catch (e) {
            window.alert(e.message);
        }
    }
}