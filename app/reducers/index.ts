import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user, { UserState, initialState as initialUserState } from './user';
import item, { ItemState, initialState as initialItemState } from './item';
import util, { UtilState, initialState as initialUtilState } from './util';
import { deleteCache } from 'actions/utilActions';

const initialState: IState = {
    user: initialUserState,
    util: initialUtilState,
    item: initialItemState
};

const appReducer = (state: IState = initialState, action: any) => {
    // Deleting cache
    if (action.type === deleteCache) {
        state = initialState;
    }
    return state;
};

const rootReducer = combineReducers({
    user,
    item,
    util,
    appReducer,
    routing: routing as Reducer<any>
});

export interface IState {
    user: UserState;
    item: ItemState;
    util: UtilState;
}

export default rootReducer;
