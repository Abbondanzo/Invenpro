import { AppState, rootReducer } from '@app/reducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(promiseMiddleware(), router);

const configureStore = (initialState: AppState) => {
    return createStore(rootReducer, initialState, enhancer) as Store<AppState>;
};

export { history, configureStore };
