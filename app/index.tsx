import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import './app.global.scss';
import Store = require("electron-store");

// Read store from disk
const electronStore = new Store();
// Import and create history
const { configureStore, history } = require('./store/configureStore');
// Configure store with previous states (read from disk)
const store = configureStore(electronStore.get('store'));
// Subscribe to every update of the store and write to disk
store.subscribe(() => {
	electronStore.set('store', store.getState())
});

render(
	<AppContainer>
		<Root store={store} history={history} />
	</AppContainer>,
	document.getElementById('root')
);

if ((module as any).hot) {
	(module as any).hot.accept('./containers/Root', () => {
		const NextRoot = require('./containers/Root').default;
		render(
			<AppContainer>
				<NextRoot store={store} history={history} />
			</AppContainer>,
			document.getElementById('root')
		);
	});
}
