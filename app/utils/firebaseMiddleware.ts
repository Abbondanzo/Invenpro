import * as firebase from 'firebase';
import { FirebaseConfig } from 'reducers/util';
import { saveConfig } from 'actions/utilActions';
// import Store = require("electron-store");

export function initializeFirebase(config: FirebaseConfig) {
	return (dispatch: Function, getState: Function) => {
		try {
			// If we import firebase, check that we use the correct initialization
			let firebaseInit = firebase
			if ((firebase as any).default) {
				firebaseInit = (firebase as any).default
			}

			// One way or another, we need to initialize the app
			let init = () => {
				let firebaseInstance = firebaseInit.initializeApp(config)
				console.log(firebaseInstance)
				// Save the instance in a dispatch
			}

			// Check if we have already initialized a firebase app. If so, delete it
			if (firebaseInit.apps.length) {
				firebaseInit.app()
					.delete()
					.then(init)
			} else {
				init()
			}
		} catch (error) {
			console.log(error)
		}
		dispatch(saveConfig(config))
	}
}

// function loadFirebase() {
//     return function (dispatch: Function, getState: Function) {
//         const { state } = getState();
//         dispatch(firebaseInitSucceeded)
//     }
// }

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