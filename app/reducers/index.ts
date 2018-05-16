import { combineReducers, Reducer } from "redux";
import { routerReducer as routing } from "react-router-redux";
import user, { UserState } from "./user";
import util, { UtilState } from "./util";

const rootReducer = combineReducers({
    user,
    util,
    routing: routing as Reducer<any>
});

export interface IState {
    user: UserState;
    util: UtilState;
}

export default rootReducer;
