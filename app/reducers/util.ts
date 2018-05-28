import * as Firebase from "firebase"
import { IUtilAction } from "actions/utilActions";
import { Types as UtilActionTypes } from "actions/utilActions";
import { IUtilActionWithPayload } from "actions/utilActions";

const initialState: UtilState = {
	firebaseDatabase: null,
	firebaseConfig: {
		projectId: "",
		bucket: "",
		databaseURL: ""
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
	databaseURL: string;
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
export default function util(state: UtilState = initialState, action: IUtilAction): UtilState {
	// TODO: Fix this bug where action types aren't loaded in with reducers
	if (!UtilActionTypes) {
		return state;
	}

	// Check if the action contains a payload, and return the state if it does
	if (isActionWithPayload(action)) {
		return utilWithPayload(state, action);
	}

	switch (action.type) {
		case UtilActionTypes.hideStatus:
			let newStatus = {
				success: {},
				error: {}
			}
			return Object.assign({}, state, { status: newStatus })
		default:
			return state;
	}
}

/**
 * Returns if the given object is a payload action. That is, the object has a 'value' parameter.
 * @param object action to test
 */
function isActionWithPayload(object: any): object is IUtilActionWithPayload<any> {
	return 'payload' in object;
}

function utilWithPayload<T>(state: UtilState = initialState, action: IUtilActionWithPayload<T>): UtilState {
	let newStatus;
	switch (action.type) {
		case UtilActionTypes.saveConfig:
			let newKeylessFirebaseConfig = Object.assign({}, action.payload)
			delete (newKeylessFirebaseConfig as any).apiKey
			return Object.assign({}, state, { firebaseConfig: newKeylessFirebaseConfig })
		case UtilActionTypes.statusSuccess:
			let successStatus = {
				message: action.payload,
				timeout: 5000
			}
			newStatus = Object.assign({}, state.status, { success: successStatus })
			return Object.assign({}, state, { status: newStatus })
		case UtilActionTypes.statusError:
			let failureStatus = {
				message: action.payload,
				timeout: 5000
			}
			newStatus = Object.assign({}, state.status, { error: failureStatus })
			return Object.assign({}, state, { status: newStatus })
		default:
			return state;
	}
}