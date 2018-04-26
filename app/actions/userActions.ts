import { Action } from 'redux'

export const Types = {
    updateName: 'UPDATE_NAME'
}

export interface IUserAction<T> extends Action {
    readonly type: String,
    readonly value: T
}

export function updateName(value: String): IUserAction<String> {
    return {
        type: Types.updateName,
        value: value
    }
}