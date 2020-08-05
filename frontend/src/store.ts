import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk, { ThunkDispatch as OldThunkDispatch } from 'redux-thunk';
import { UserState, usersReducer } from './redux/user/reducer';
import { UserActions } from './redux/user/actions';
import { createBrowserHistory } from 'history';
import { RouterState, connectRouter, routerMiddleware } from 'connected-react-router';

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}
// export type RootAction = QuestionsActions|RoomsActions|AuthActions;

export type RootAction = UserActions; 

export type ThunkDispatch = OldThunkDispatch<RootState, null, RootAction>
export const history = createBrowserHistory();
export interface RootState {
    user: UserState,
    router: RouterState
}

const reducer = combineReducers<RootState>({
    user: usersReducer,
    router: connectRouter(history)
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  ));
