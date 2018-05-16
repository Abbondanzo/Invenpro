// import * as firebase from 'firebase';
import { FirebaseConfig } from 'reducers/util';
import { saveConfig } from 'actions/utilActions';
// import Store = require("electron-store");

export function initializeFirebase(config: FirebaseConfig) {
    return (dispatch: Function, getState: Function) => {

        try {
            // TODO: Fix firebase initialization
            // TODO: Use commented functions below to dispatch successful launches
            // firebase.initializeApp(config);
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