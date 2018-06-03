import * as firebase from 'firebase';
import { FirebaseConfig, KeylessFirebaseConfig } from 'reducers/util';
import { saveConfig, statusSuccess, statusError } from 'actions/utilActions';
import FirebaseManager from 'api/firebaseDatabase';
// import { ItemState } from 'reducers/item';
// import { firebaseItem } from 'actions/itemActions';
// import { UserState } from 'reducers/user';
// import { firebaseUser } from 'actions/userActions';
// import Store = require("electron-store");

const keytar = require('keytar');
const applicationName = 'Invenpro';

/**
 * Middleware function.
 *
 * Attempts to configure and start a Firebase instance. If an instance already exists, this will
 * delete the previous instance and create a new one. Once the firebase instance is initialized, the
 * configuration is stored and a database instance is created. API Key will also be stored securely
 * using the OS's encrypted key storage.
 *
 * @param config {@link FirebaseConfig}
 */
export function initializeFirebase(config: FirebaseConfig) {
    return (dispatch: Function, getState: Function) => {
        try {
            // If we import firebase, check that we use the correct initialization
            let firebaseInit = firebase;
            if ((firebase as any).default) {
                firebaseInit = (firebase as any).default;
            }

            // One way or another, we need to initialize the app
            let init = () => {
                let firebaseInstance = firebaseInit.initializeApp({
                    apiKey: config.apiKey,
                    authDomain: config.projectId ? config.projectId + '.firebaseapp.com' : '',
                    databaseURL: config.databaseURL,
                    storageBucket: config.bucket
                });
                saveDatabase(firebaseInstance, dispatch);
                dispatch(saveConfig(config));
                saveApiKey(config.apiKey, config.projectId);
                // Save the instance in a dispatch
            };

            // Check if we have already initialized a firebase app. If so, delete it
            if (firebaseInit.apps && firebaseInit.apps.length) {
                firebaseInit
                    .app()
                    .delete()
                    .then(init);
            } else {
                init();
            }
        } catch (error) {
            console.log(error);
        }
    };
}

/**
 * Securely stores the given API key in the OS's encrypted key storage.
 * @param apiKey
 * @param projectDomain Unique project domain assigned to a firebase storage. Allows multiple keys
 * to be stored.
 */
function saveApiKey(apiKey: string, projectDomain: string) {
    let projectId = projectDomain.split('.firebaseapp')[0];
    keytar.setPassword(applicationName, projectId, apiKey);
}

/**
 * Returns a Promise giving unencrypted access to the stored API key of the given project domain.
 * @param projectDomain
 */
export function getApiKey(projectDomain: string): Promise<string> | null {
    if (!projectDomain) {
        return null;
    }
    let projectId = projectDomain.split('.firebaseapp')[0];
    return keytar.getPassword(applicationName, projectId);
}

/**
 * Attempts to create a new Firebase database instance and saves it to the {@link FirebaseManager}
 * @param firebaseApp initialized Firebase instance
 * @param dispatch sends actions to reducers with success/failure status
 */
function saveDatabase(firebaseApp: firebase.app.App, dispatch: Function) {
    try {
        let database = firebaseApp.database();
        let firebaseManager = FirebaseManager.getInstance();
        firebaseManager.setDatabase(database);
        dispatch(statusSuccess('Firebase database successfully initialized'));
        firebaseManager.subscribeToStore();
    } catch (error) {
        if (error.message) {
            let message = error.message.split(/FIREBASE|ERROR:\s?/);
            message = message[message.length - 1];
            dispatch(statusError(message));
            // TODO: Dispatch error
        }
    }
}

// function setListeners(dispatch: Function) {
// 	let manager = FirebaseManager.getInstance()
// 	// Listen for changes to items
// 	let itemState = manager.getItemState()
// 	if (itemState) {
// 		itemState.on('value', (snapshot: any) => {
// 			if (snapshot) {
// 				// let newItemState: ItemState = {
// 				// 	itemMap: snapshot.itemMap
// 				// }
// 				//dispatch(firebaseItem(newItemState))
// 			}
// 		})
// 	}
// 	// Listen for changes to users
// 	let userState = manager.getUserState()
// 	if (userState) {
// 		userState.on('value', (snapshot: any) => {
// 			if (snapshot) {
// 				dispatch(statusSuccess("test"))
// 				// let newUserState: UserState = {
// 				// 	currentUser: snapshot.currentUser,
// 				// 	userMap: snapshot.userMap
// 				// }
// 				//dispatch(firebaseUser(newUserState))
// 			}
// 		})
// 	}

// }

/**
 * Attempts to load a Firebase instance using stored.
 */
export function loadFirebase() {
    return function(dispatch: Function, getState: Function) {
        let state = getState();
        if (state.util && state.util.firebaseConfig) {
            let keylessConfig: KeylessFirebaseConfig = state.util.firebaseConfig;

            if (!keylessConfig.projectId) {
                return;
            }

            let apiPromise = getApiKey(keylessConfig.projectId);
            let error = () => {
                dispatch(statusError('Error loading API Key'));
            };

            if (apiPromise) {
                apiPromise
                    .then((apiKey: string) => {
                        let config: FirebaseConfig = Object.assign({}, state.util.firebaseConfig, {
                            apiKey: apiKey
                        });
                        dispatch(initializeFirebase(config));
                    })
                    .catch(() => {
                        error();
                    });
            }
        }
    };
}

// function firebaseInitSucceeded(firebase: firebase.database.Database) {
//     return {
//         type: 'FIREBASE_INIT_SUCCEEDED',
//         payload: firebase
//     }
// }

// function firebaseInitFailed(message: string) {
//     return {
//         type: 'FIREBASE_INIT_FAILED',
//         payload: message
//     }
// }
