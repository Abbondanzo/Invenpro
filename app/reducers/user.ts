import { IUserAction, Types as UserActionTypes, IUserActionWithPayload } from 'actions/userActions';
import * as ReducerHelper from 'reducers/helper';

export type User = ReducerHelper.IObjectWithId & {
    name: string;
};

export type UserMap = ReducerHelper.IObjectMap<User>;

export type UserState = ReducerHelper.IStateWithMap<User>;

export const initialState: UserState = ReducerHelper.initialState;

/**
 * Reducer over user state.
 * @param state Contains properties to carry into the newly returned state
 * @param action Information containing updates to the state
 */
export default function user(state: UserState = initialState, action: IUserAction): UserState {
    // TODO: Fix this bug where action types aren't loaded in with reducers
    if (!UserActionTypes) {
        return state;
    }

    // Initialize the map if reset
    if (!state.map) {
        state = { ...state, map: {} };
    }

    // Check if the action contains a payload, and return the state if it does
    if (isActionWithPayload(action)) {
        return userWithPayload(state, action as IUserActionWithPayload<any>);
    }

    switch (action.type) {
        case UserActionTypes.selectUser:
            return ReducerHelper.selectObject(state, action.user);
        case UserActionTypes.unselectUser:
            return ReducerHelper.unselectObject(state);
        default:
            return state;
    }
}

/**
 * Returns if the given object is a payload action. That is, the object has a 'payload' parameter.
 * @param object action to test
 */
function isActionWithPayload(object: any): Boolean {
    return 'payload' in object;
}

/**
 * Returns if the given object is a User. That is, the object has a 'name' parameter.
 * @param object action to test
 */
function isUser(object: any): object is User {
    return (<User>object).name !== undefined;
}

/**
 * Performs actions over users in the state with updated payload information.
 * @param state State containing information about the users
 * @param action Action that contains a payload to update the user with
 */
function userWithPayload<T>(
    state: UserState = initialState,
    action: IUserActionWithPayload<T>
): UserState {
    let oldUser = state.map[action.user];
    switch (action.type) {
        case UserActionTypes.addUser:
            console.log(action.payload);
            if (isUser(action.payload)) {
                return ReducerHelper.addObject(state, action.payload);
            }
        case UserActionTypes.updateName:
            if (oldUser) {
                let userWithNewName = updateUser(oldUser, { name: action.payload });
                return ReducerHelper.editObject(state, action.user, userWithNewName);
            }
        case UserActionTypes.editUser:
            if (isUser(action.payload)) {
                if (oldUser) {
                    let newUser = updateUser(oldUser, action.payload);
                    return ReducerHelper.editObject(state, action.user, newUser);
                } else {
                    return ReducerHelper.addObject(state, action.payload);
                }
            }
        case UserActionTypes.firebaseUser:
            if (action.payload) {
                return Object.assign(state, action.payload);
            }
        default:
            return state;
    }
}

/**
 * Given a user and a set of parameters, returns a user with those new values.
 * @param oldUser old user to update
 * @param newValues new user parameters to assign
 */
function updateUser(oldUser: User, newValues: Object): User {
    let oldUserId = oldUser.id;
    return Object.assign(oldUser, newValues, { id: oldUserId });
}
