import * as firebase from 'firebase';
import { ItemState } from 'reducers/item';
import { UserState } from 'reducers/user';

export default class FirebaseManager {
	static instance: FirebaseManager | null = null;
	_database: firebase.database.Database;

    /**
     * @returns {FirebaseManager}
     */
	static getInstance(): FirebaseManager {
		if (FirebaseManager.instance == null) {
			FirebaseManager.instance = new FirebaseManager();
		}
		return FirebaseManager.instance;
	}

	getDatabase(): firebase.database.Database {
		return this._database;
	}

	setDatabase(database: firebase.database.Database) {
		this._database = database;
	}

	getItemState() {
		if (this._database) {
			return this._database.ref('/items')
		}
		return null
	}

	storeItemState(state: ItemState) {
		if (this._database) {
			this._database.ref('/items').set(state)
		}
	}

	storeUserState(state: UserState) {
		if (this._database) {
			this._database.ref('/users').set(state)
		}
	}
}