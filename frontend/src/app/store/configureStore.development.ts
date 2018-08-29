import { AppState, rootReducer } from '@app/reducers';
import { createHashHistory } from 'history';
import { push, routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

declare const window: Window & {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

declare const module: NodeModule & {
    hot?: {
        accept(...args: any[]): any;
    };
};

const actionCreators = Object.assign({}, { push });

const logger = (<any>createLogger)({
    level: 'info',
    collapsed: true
});

const history = createHashHistory();
const router = routerMiddleware(history);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
          actionCreators
      }) as any)
    : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, router, logger));

const configureStore = (initialState: AppState) => {
    const store = createStore(rootReducer, initialState, enhancer) as Store<AppState>;
    if (module.hot) {
        module.hot.accept(
            '@app/reducers',
            () => store.replaceReducer(require('@app/reducers').default) // eslint-disable-line global-require
        );
    }
    return store;
};

export { history, configureStore };
