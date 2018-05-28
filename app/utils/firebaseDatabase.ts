import * as firebase from 'firebase';
import { ItemState } from 'reducers/item';
import { UserState } from 'reducers/user';

const FIREBASE_ITEMS = '/items'
const FIREBASE_USERS = '/users'

export default class FirebaseManager {
	static instance: FirebaseManager | null = null;
	_database: firebase.database.Database;

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
	 * Returns a reference to the items Firebase storage. Can be used for live updates.
	 * @returns [firebase.database.Reference | null]
	 */
	getItemState(): firebase.database.Reference | null {
		if (this._database) {
			return this._database.ref(FIREBASE_ITEMS)
		}
		return null
	}

	/**
	 * Sets item state inside Firebase.
	 * @param state {ItemState}
	 */
	storeItemState(state: ItemState) {
		if (this._database) {
			this._database.ref(FIREBASE_ITEMS).set(state)
		}
	}

	/**
	 * Returns a reference to the users Firebase storage. Can be used for live updates.
	 * @returns [firebase.database.Reference | null]
	 */
	getUserState(): firebase.database.Reference | null {
		if (this._database) {
			return this._database.ref(FIREBASE_USERS)
		}
		return null
	}

	/**
	 * Sets user state inside Firebase.
	 * @param state {UserState}
	 */
	storeUserState(state: UserState) {
		if (this._database) {
			this._database.ref(FIREBASE_USERS).set(state)
		}
	}
}