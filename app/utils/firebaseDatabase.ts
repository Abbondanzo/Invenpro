import * as firebase from 'firebase';
import { ItemState } from 'reducers/item';
import { UserState } from 'reducers/user';
import { IState } from 'reducers';

const FIREBASE_ITEMS = '/items';
const FIREBASE_USERS = '/users';

export default class FirebaseManager {
    static instance: FirebaseManager | null = null;
    _database: firebase.database.Database;
    itemState: ItemState;
    userState: UserState;

    /**
     * Firebase database singleton. Creates a firebase manager if there is none or returns the
     * static instance.
     * @returns {FirebaseManager}
     */
    static getInstance(): FirebaseManager {
        if (FirebaseManager.instance == null) {
            FirebaseManager.instance = new FirebaseManager();
        }
        return FirebaseManager.instance;
    }

    /**
     * Gets a reference to the Firebase database.
     * @returns {firebase.database.Database}
     */
    getDatabase(): firebase.database.Database {
        return this._database;
    }

    /**
     * Sets a new Firebase database instance.
     * @param database {firebase.database.Database}
     */
    setDatabase(database: firebase.database.Database) {
        this._database = database;
    }

    /**
     * Subscribes to changes of the global store in order to store specific states.
     */
    subscribeToStore() {
        let { store } = require('store/store');
        store.subscribe(() => {
            console.log('Store change!');
            let state: IState = store.getState();
            // These will succeed and send the first time there is a valid database
            this.storeItemState(state.item);
            this.storeUserState(state.user);
        });
    }

    /**
     * Returns a reference to the items Firebase storage. Can be used for live updates.
     * @returns [firebase.database.Reference | null]
     */
    getItemState(): firebase.database.Reference | null {
        if (this._database) {
            return this._database.ref(FIREBASE_ITEMS);
        }
        return null;
    }

    /**
     * Sets item state inside Firebase.
     * @param state {ItemState}
     */
    storeItemState(state: ItemState) {
        if (this._database && state != this.itemState) {
            this.itemState = state;
            this._database.ref(FIREBASE_ITEMS).set(state);
        }
    }

    /**
     * Returns a reference to the users Firebase storage. Can be used for live updates.
     * @returns [firebase.database.Reference | null]
     */
    getUserState(): firebase.database.Reference | null {
        if (this._database) {
            return this._database.ref(FIREBASE_USERS);
        }
        return null;
    }

    /**
     * Sets user state inside Firebase.
     * @param state {UserState}
     */
    storeUserState(state: UserState) {
        console.log('Storing user');
        if (this._database && state != this.userState) {
            this.userState = state;
            console.log(state);
            this._database.ref(FIREBASE_USERS).set(state);
        }
    }
}
