import { AppContainer } from '@app/containers/AppContainer';
import { history, store } from '@app/store';
import { History } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer as HotAppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Store } from 'redux';
import './app.global.scss';

ReactDOM.render(
    <HotAppContainer>
        <Root store={store} history={history} />
    </HotAppContainer>,
    document.getElementById('root')
);

if ((module as any).hot) {
    (module as any).hot.accept('./containers/Root', () => {
        const NextRoot = Root;
        ReactDOM.render(
            <HotAppContainer>
                <NextRoot store={store} history={history} />
            </HotAppContainer>,
            document.getElementById('root')
        );
    });
}

interface IRootType {
    store: Store<any>;
    history: History;
}

function Root({ store, history }: IRootType) {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppContainer />
            </ConnectedRouter>
        </Provider>
    );
}
