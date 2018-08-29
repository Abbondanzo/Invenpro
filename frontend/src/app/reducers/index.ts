import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

export interface AppState {
    router: RouterState;
}

export const rootReducer = combineReducers<AppState>({
    router: routerReducer as any
});
