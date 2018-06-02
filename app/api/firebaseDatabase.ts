import * as firebase from 'firebase';
import { ItemState } from 'reducers/item';
import { UserState } from 'reducers/user';
import { IState } from 'reducers';
import { firebaseItem } from 'actions/itemActions';
import { firebaseUser } from 'actions/userActions';

const FIREBASE_ITEMS = '/items';
const FIREBASE_USERS = '/users';

export default class FirebaseManager {
    static instance: FirebaseManager | null = null;
    _store: any;
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
        this._store = store;
        this._store.subscribe(() => {
            let state: IState = this._store.getState();
            // These will succeed and send the first time there is a valid database
            this.storeItemState(state.item);
            this.storeUserState(state.user);
        });
        this.subscribeToFirebase();
    }

    /**
     * Subscribes to changes from the Firebase database references to update specific states.
     */
    subscribeToFirebase() {
        let itemStateGetter = this.getItemState();
        if (itemStateGetter) {
            itemStateGetter.on('value', (snapshot: firebase.database.DataSnapshot) => {
                let newItemState: ItemState = snapshot.val();
                if (newItemState) {
                    this._store.dispatch(firebaseItem(newItemState));
                }
            });
        }

        let userStateGetter = this.getUserState();
        if (userStateGetter) {
            userStateGetter.on('value', (snapshot: firebase.database.DataSnapshot) => {
                let newUserState: UserState = snapshot.val();
                if (newUserState) {
                    this._store.dispatch(firebaseUser(newUserState));
                }
            });
        }
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
        if (this._database && state != this.userState) {
            this.userState = state;
            this._database.ref(FIREBASE_USERS).set(state);
        }
    }
}
