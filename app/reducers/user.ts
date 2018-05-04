import {
	IUserAction,
	Types as UserActionTypes,
	IUserActionPayload
} from "actions/userActions";

const initialState: UserState = {
	userList: []
};

export type UserState = {
	userList: Array<User>;
};

export type User = {
	name: string;
};

export default function user(
	state: UserState = initialState,
	action: IUserAction
): UserState {
	switch (action.type) {
		case UserActionTypes.addUser:
			return addUserState(state, action.user);
		default:
			return state;
	}
}

export function userWithPayload<T>(
	state: UserState = initialState,
	action: IUserActionPayload<T>
): UserState {
	switch (action.type) {
		case UserActionTypes.updateName:
			let userWithNewName = updateUser(action.user, { name: action.value });
			return updateUserState(state, action.user, userWithNewName);
		case UserActionTypes.editUser:
			let newUser = updateUser(action.user, action.value);
			console.log(action.user)
			console.log(action.value)
			return updateUserState(state, action.user, newUser);
		default:
			return state;
	}
}

function updateUser(oldUser: User, newValues: Object) {
	return Object.assign({}, oldUser, newValues);
}

/**
 * Given a state and old/new users, update the list of users by replacing the existing user or adding it to the list.
 * @param oldState {@link UserState} to update
 * @param newUser the user we wish to inject or add to the list
 */
function addUserState(oldState: UserState, newUser: User) {
	let userList = oldState.userList;
	userList.push(newUser);
	return Object.assign({}, oldState, { userList: userList });
}

/**
 * Given a state and old/new users, update the list of users by replacing the existing user or adding it to the list.
 * @param oldState {@link UserState} to update
 * @param oldUser the previous user we wish to update
 * @param newUser the user we wish to inject or add to the list
 */
function updateUserState(oldState: UserState, oldUser: User, newUser: User) {
	let userList = oldState.userList;
	let oldUserIndex = userList.indexOf(oldUser);

	// If the user exists, replace it. Otherwise, add it
	if (oldUserIndex !== -1) {
		userList[oldUserIndex] = newUser;
	} else {
		userList.push(newUser);
	}

	return Object.assign({}, oldState, { userList: userList });
}
