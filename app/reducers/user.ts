import {
	IUserAction,
	Types as UserActionTypes,
	IUserActionWithPayload
} from "actions/userActions";
import guid from "utils/uuid";
import FirebaseManager from "utils/firebaseDatabase";

export const initialState: UserState = {
	userMap: new Map(),
	currentUser: undefined
};

export type UserState = {
	userMap: Map<string, User>;
	currentUser: User | undefined;
};

export type User = {
	name: string;
	id: string;
};

const firebaseManager = FirebaseManager.getInstance()

/**
 * Reducer over user state.
 * @param state Contains properties to carry into the newly returned state
 * @param action Information containing updates to the state
 */
export default function user(
	state: UserState = initialState,
	action: IUserAction
): UserState {
	// TODO: Fix this bug where action types aren't loaded in with reducers
	if (!UserActionTypes) {
		return state;
	}

	// Check if the action contains a payload, and return the state if it does
	if (isActionWithPayload(action)) {
		let newUserState = userWithPayload(state, action);
		firebaseManager.storeUserState(newUserState)
		return newUserState;
	}

	let newUserState;
	switch (action.type) {
		case UserActionTypes.selectUser:
			newUserState = selectUser(state, action.user);
			break;
		default:
			return state;
	}
	firebaseManager.storeUserState(state)
	return newUserState;
}

/**
 * Returns if the given object is a payload action. That is, the object has a 'value' parameter.
 * @param object action to test
 */
function isActionWithPayload(object: any): object is IUserActionWithPayload<any> {
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
function userWithPayload<T>(state: UserState = initialState, action: IUserActionWithPayload<T>): UserState {
	if (!state.userMap) {
		return state
	}

	let oldUser
	try {
		oldUser = state.userMap.get(action.user)
	} catch (error) {
		// Map was turned into an object--convert it back
		state.userMap = convertObjectToMap(state.userMap)
		oldUser = state.userMap.get(action.user)
	}
	switch (action.type) {
		case UserActionTypes.addUser:
			if (isUser(action.payload)) {
				return addUserState(state, action.payload);
			}
		case UserActionTypes.updateName:
			if (oldUser) {
				let userWithNewName = updateUser(oldUser, { name: action.payload });
				return updateUserState(state, action.user, userWithNewName);
			}
		case UserActionTypes.editUser:
			if (isUser(action.payload)) {
				if (oldUser) {
					let newUser = updateUser(oldUser, action.payload);
					return updateUserState(state, action.user, newUser);
				} else {
					return addUserState(state, action.payload)
				}
			}
		default:
			return state;
	}
}

function convertObjectToMap(object: any): Map<any, any> {
	let map = new Map();
	Object.keys(object).map((key: any) => {
		let value = object[key]
		map.set(key, value)
	})
	return map
}

/**
 * Given a user and a set of parameters, returns a user with those new values.
 * @param oldUser old user to update
 * @param newValues new user parameters to assign
 */
function updateUser(oldUser: User, newValues: Object): User {
	let oldUserId = oldUser.id
	return Object.assign({}, oldUser, newValues, { id: oldUserId });
}

/**
 * Given a state and old/new users, update the map of users by replacing the existing user or adding
 * it to the map.
 * @param oldState {@link UserState} to update
 * @param newUser the user we wish to inject or add to the map
 */
function addUserState(oldState: UserState, newUser: User): UserState {
	let userMap = oldState.userMap;
	let newUserId = guid()
	while (userMap.get(newUserId)) {
		newUserId = guid()
	}
	Object.assign(newUser, { id: newUserId })
	userMap.set(newUserId, newUser)
	return Object.assign({}, oldState, { userMap: userMap });
}



/**
 * Updates the selected user state with the given user.
 * @param oldState state containing old selected user
 * @param selectedUser user id to select
 */
function selectUser(oldState: UserState, selectedUser: string): UserState {
	return Object.assign({}, oldState, { currentUser: oldState.userMap.get(selectedUser) });
}

/**
 * Given a state and old/new users, update the map of users by replacing the existing user or adding
 * it to the map.
 * @param oldState {@link UserState} to update
 * @param oldUserId the previous user we wish to update
 * @param newUser the user we wish to inject or add to the map
 */
function updateUserState(oldState: UserState, oldUserId: string, newUser: User): UserState {
	let userMap = oldState.userMap;
	userMap.set(oldUserId, newUser)
	return Object.assign({}, oldState, { userMap: userMap });
}
