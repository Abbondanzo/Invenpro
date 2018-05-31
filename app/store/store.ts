import Store = require("electron-store");

// Read store from disk
const electronStore = new Store();
// Import and create history
const { configureStore, history } = require('./configureStore');
// Configure store with previous states (read from disk)
const store = configureStore(electronStore.get('store'));
// Subscribe to every update of the store and write to disk
store.subscribe(() => {
	electronStore.set('store', store.getState())
});

export = {
	store,
	history
}