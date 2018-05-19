import { Action } from "redux";
import { KeylessFirebaseConfig } from "reducers/util";

export const Types = {
	saveConfig: "SAVE_CONFIG"
}

/**
 * An action containing a payload of type T.
 */
export interface IUtilAction<T> extends Action {
	readonly type: String;
	readonly payload: T;
}

export interface IUtilActionWithPromise<T> extends IUtilAction<Promise<T>> { }

export function saveConfig(config: KeylessFirebaseConfig): IUtilAction<KeylessFirebaseConfig> {
	return {
		type: Types.saveConfig,
		payload: config
	}
}