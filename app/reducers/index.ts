import { combineReducers, Reducer } from "redux";
import { routerReducer as routing } from "react-router-redux";
import user, { UserState } from "./user";

const rootReducer = combineReducers({
	user,
	routing: routing as Reducer<any>
});

export interface IState {
	user: UserState;
}

export default rootReducer;
