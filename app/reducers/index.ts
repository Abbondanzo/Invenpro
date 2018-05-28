import { combineReducers, Reducer } from "redux";
import { routerReducer as routing } from "react-router-redux";
import user, { UserState } from "./user";
import item, { ItemState } from "./item";
import util, { UtilState } from "./util";

const rootReducer = combineReducers({
	user,
	item,
	util,
	routing: routing as Reducer<any>
});

export interface IState {
	user: UserState;
	item: ItemState;
	util: UtilState;
}

export default rootReducer;
