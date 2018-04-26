import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import user, { UserState } from './user';

const rootReducer = combineReducers({
    counter,
    user,
    routing: routing as Reducer<any>
});

export interface IState {
    counter: TCounterState;
    user: UserState;
}

export default rootReducer;
