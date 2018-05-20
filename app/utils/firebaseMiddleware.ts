import * as firebase from 'firebase';
import { FirebaseConfig } from 'reducers/util';
import { saveConfig, statusError } from 'actions/utilActions';
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
                saveDatabase(firebaseInstance, dispatch)
                dispatch(saveConfig(config))
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
    }
}

function saveDatabase(firebaseApp: firebase.app.App, dispatch: Function) {
    try {
        let database = firebaseApp.database()
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