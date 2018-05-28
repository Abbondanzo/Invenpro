import {
	IUserAction,
	Types as UserActionTypes,
	IUserActionPayload
} from "actions/userActions";
import guid from "utils/uuid";
import FirebaseManager from "utils/firebaseDatabase";

const initialState: UserState = {
	userList: [],
	currentUser: undefined
};

export type UserState = {
	userList: Array<User>;
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
		case UserActionTypes.addUser:
			newUserState = addUserState(state, action.user);
			break;
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
function isActionWithPayload(object: any): object is IUserActionPayload<any> {
	return 'value' in object;
}

/**
 * Performs actions over users in the state with updated value information.
 * @param state State containing information about the users
 * @param action Action that contains a payload to update the user with
 */
function userWithPayload<T>(
	state: UserState = initialState,
	action: IUserActionPayload<T>
): UserState {
	switch (action.type) {
		case UserActionTypes.updateName:
			let userWithNewName = updateUser(action.user, { name: action.value });
			return updateUserState(state, action.user, userWithNewName);
		case UserActionTypes.editUser:
			let newUser = updateUser(action.user, action.value);
			return updateUserState(state, action.user, newUser);
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
	return Object.assign({}, oldUser, newValues);
}

/**
 * Given a state and old/new users, update the map of users by replacing the existing user or adding it to the map.
 * @param oldState {@link UserState} to update
 * @param newUser the user we wish to inject or add to the map
 */
function addUserState(oldState: UserState, newUser: User): UserState {
	let userList = oldState.userList;
	Object.assign(newUser, {
		id: guid()
	})
	userList.push(newUser);
	return Object.assign({}, oldState, { userList: userList });
}



/**
 * Updates the selected user state with the given user
 * @param oldState state containing old selected user
 * @param selectedUser user to select
 */
function selectUser(oldState: UserState, selectedUser: User): UserState {
	return Object.assign({}, oldState, { currentUser: selectedUser });
}

/**
 * Given a state and old/new users, update the map of users by replacing the existing user or adding it to the map.
 * @param oldState {@link UserState} to update
 * @param oldUser the previous user we wish to update
 * @param newUser the user we wish to inject or add to the map
 */
function updateUserState(oldState: UserState, oldUser: User, newUser: User): UserState {
	let userList = oldState.userList;
	let oldUserIndex = userList.map((user: User) => { return user.name }).indexOf(oldUser.name);

	if (oldUserIndex !== -1) {
		userList[oldUserIndex] = newUser;
	} else {
		userList.push(newUser);
	}

	return Object.assign({}, oldState, { userList: userList });
}
