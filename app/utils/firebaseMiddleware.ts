import * as firebase from 'firebase';
import { FirebaseConfig, KeylessFirebaseConfig } from 'reducers/util';
import { saveConfig, statusError } from 'actions/utilActions';
import { statusSuccess } from 'actions/utilActions';
// import Store = require("electron-store");

const keytar = require('keytar')
const applicationName = 'Invenpro'

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
				let firebaseInstance = firebaseInit.initializeApp({
					apiKey: config.apiKey,
					authDomain: config.projectId ? (config.projectId + ".firebaseapp.com") : "",
					databaseURL: config.databaseURL,
					storageBucket: config.bucket
				})
				saveDatabase(firebaseInstance, dispatch)
				dispatch(saveConfig(config))
				saveApiKey(config.apiKey, config.projectId)
				// Save the instance in a dispatch
			}

			// Check if we have already initialized a firebase app. If so, delete it
			if (firebaseInit.apps && firebaseInit.apps.length) {
				firebaseInit.app()
					.delete()
					.then(init)
			} else {
				init()
			}
		} catch (error) {
			console.log(error)
		}
	}
}

function saveApiKey(apiKey: string, projectDomain: string) {
	let projectId = projectDomain.split('.firebaseapp')[0]
	keytar.setPassword(applicationName, projectId, apiKey)
}

export function getApiKey(projectDomain: string): Promise<string> {
	let projectId = projectDomain.split('.firebaseapp')[0]
	return keytar.getPassword(applicationName, projectId)
}

function saveDatabase(firebaseApp: firebase.app.App, dispatch: Function) {
	try {
		let database = firebaseApp.database()
		dispatch(statusSuccess("Firebase database successfully initialized"))
		console.log(database)
	} catch (error) {
		if (error.message) {
			let message = error.message.split(/FIREBASE|ERROR:\s?/)
			message = message[message.length - 1]
			dispatch(statusError(message))
			// TODO: Dispatch error
		}

	}
}

export function loadFirebase() {
	return function (dispatch: Function, getState: Function) {
		const { state } = getState();
		if (state.util && state.util.firebaseConfig) {
			let keylessConfig: KeylessFirebaseConfig = state.util.firebaseConfig
			getApiKey(keylessConfig.projectId).then((apiKey: string) => {
				let config: FirebaseConfig = Object.assign({}, state.util.firebaseConfig, { apiKey: apiKey })
				dispatch(initializeFirebase(config))
			}).catch(() => {
				dispatch(statusError("Error loading API Key"))
			})
		}
	}
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