import { Action } from 'redux';
import { KeylessFirebaseConfig } from 'reducers/util';

export const Types = {
    saveConfig: 'SAVE_CONFIG',
    statusSuccess: 'STATUS_SUCCESS',
    statusError: 'STATUS_ERROR',
    hideStatus: 'STATUS_HIDE',
    deleteCache: 'DELETE_CACHE'
};

/**
 * A utility action.
 */
export interface IUtilAction extends Action {
    readonly type: string;
}

/**
 * An action containing a payload of type T.
 */
export interface IUtilActionWithPayload<T> extends IUtilAction {
    readonly payload: T;
}

export function saveConfig(
    config: KeylessFirebaseConfig
): IUtilActionWithPayload<KeylessFirebaseConfig> {
    return {
        type: Types.saveConfig,
        payload: config
    };
}

export function statusSuccess(successMessage: string): IUtilActionWithPayload<string> {
    return {
        type: Types.statusSuccess,
        payload: successMessage
    };
}

export function statusError(errorMessage: string): IUtilActionWithPayload<string> {
    return {
        type: Types.statusError,
        payload: errorMessage
    };
}

export function hideStatus(): IUtilAction {
    return {
        type: Types.hideStatus
    };
}

export function deleteCache(): IUtilAction {
    return {
        type: Types.deleteCache
    };
}
