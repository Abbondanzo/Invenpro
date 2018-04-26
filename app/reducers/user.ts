import { IUserAction, Types as UserActionTypes } from '../actions/userActions';

const initialState: UserState = {
    name: ""
}

export type UserState = {
    name: string
}

export default function user<T>(state: UserState = initialState, action: IUserAction<T>): UserState {
    switch (action.type) {
        case UserActionTypes.updateName:
            return updateUser(state, { name: action.value })
        default:
            return state;
    }
}

function updateUser(oldUser: UserState, newValues: Object) {
    return Object.assign({}, oldUser, newValues);
}