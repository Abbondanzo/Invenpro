import * as Firebase from "firebase"
import { IUtilAction } from "actions/utilActions";
import { Types as UtilActionTypes } from "actions/utilActions";

const initialState: UtilState = {
    firebaseDatabase: null,
    firebaseConfig: {
        projectId: "",
        bucket: "",
        databaseName: ""
    },
    status: {
        success: {} as Status,
        error: {} as Status
    }
}

export type UtilState = {
    firebaseDatabase: Firebase.database.Database | null;
    firebaseConfig: KeylessFirebaseConfig;
    status: IStatus;
}

export type KeylessFirebaseConfig = {
    projectId: string;
    bucket: string;
    databaseName: string;
}

export type FirebaseConfig = KeylessFirebaseConfig & {
    apiKey: string;
};

export interface IStatus {
    success: Status;
    error: Status;
}

export type Status = {
    message: string | null
    timeout: number | null
}

/**
 * Performs action over utility state with the given {@link IUtilAction}
 * @param state previous (or initial) utility state
 * @param action action to perform over the given state
 */
export default function util<T>(state: UtilState = initialState, action: IUtilAction<T>): UtilState {
    // TODO: Fix this bug where action types aren't loaded in with reducers
    if (!UtilActionTypes) {
        return state;
    }

    switch (action.type) {
        case UtilActionTypes.saveConfig:
            let newKeylessFirebaseConfig = Object.assign({}, action.payload)
            delete (newKeylessFirebaseConfig as any).apiKey
            return Object.assign(state, { firebaseConfig: newKeylessFirebaseConfig })
        default:
            return state;
    }
}