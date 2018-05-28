import { Action } from "redux";
import { KeylessFirebaseConfig } from "reducers/util";
import * as firebase from 'firebase';

export const Types = {
	saveConfig: "SAVE_CONFIG",
	saveDatabase: "SAVE_DATABASE",
	statusSuccess: "STATUS_SUCCESS",
	statusError: "STATUS_ERROR",
	hideStatus: "STATUS_HIDE",
	deleteCache: "DELETE_CACHE"
}

/**
 * An action containing a payload of type T.
 */
export interface IUtilAction extends Action {
	readonly type: string;
}

export interface IUtilActionWithPayload<T> extends IUtilAction {
	readonly payload: T;
}

export function saveConfig(config: KeylessFirebaseConfig): IUtilActionWithPayload<KeylessFirebaseConfig> {
	return {
		type: Types.saveConfig,
		payload: config
	}
}

export function saveDatabase(database: firebase.database.Database): IUtilActionWithPayload<firebase.database.Database> {
	return {
		type: Types.saveDatabase,
		payload: database
	}
}

export function statusSuccess(successMessage: string): IUtilActionWithPayload<string> {
	return {
		type: Types.statusSuccess,
		payload: successMessage
	}
}

export function statusError(errorMessage: string): IUtilActionWithPayload<string> {
	return {
		type: Types.statusError,
		payload: errorMessage
	}
}

export function hideStatus(): IUtilAction {
	return {
		type: Types.hideStatus
	}
}

export function deleteCache(): IUtilAction {
	return {
		type: Types.deleteCache
	}
}