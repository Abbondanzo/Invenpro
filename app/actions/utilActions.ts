import { Action } from "redux";

export const Types = {

}

/**
 * An action containing a payload of type T.
 */
export interface IUtilAction<T> extends Action {
    readonly type: String;
    readonly payload: T;
}