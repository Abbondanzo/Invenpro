import { AppState } from '@app/reducers';
// import FirebaseApp from '@app/utils/firebase';
import * as development from './configureStore.development';
import * as production from './configureStore.production';

// Grab the correct store configuration
const configureStore =
    process.env.NODE_ENV === 'production' ? production.configureStore : development.configureStore;
const initialState = {} as AppState;

const history = process.env.NODE_ENV === 'production' ? production.history : development.history;
const store = configureStore(initialState);

export { history, store };
