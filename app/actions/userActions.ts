import { Action } from "redux";
import { User } from "reducers/user";
import { UserState } from "reducers/user";

const { history } = require('store/configureStore');

export const Types = {
	addUser: "ADD_USER",
	selectUser: "SELECT_USER",
	updateName: "UPDATE_NAME",
	editUser: "EDIT_USER",
	firebaseUser: "FIREBASE_USER_UPDATE"
};

/**
 * An action over a single user
 */
export interface IUserAction extends Action {
	readonly type: String;
	readonly user: string;
}

/**
 * An action over a single user containing a payload of information
 */
export interface IUserActionWithPayload<T> extends IUserAction {
	readonly payload: T;
}

export function addUser(user: User): IUserActionWithPayload<User> {
	return {
		type: Types.addUser,
		user: "",
		payload: user
	};
}

export function selectUser(userId: string): IUserAction {
	history.push('/users/edit-user')
	return {
		type: Types.selectUser,
		user: userId
	}
}

export function editUser(oldUser: User, newUser: User): IUserActionWithPayload<User> {
	return {
		type: Types.editUser,
		user: oldUser.id,
		payload: newUser
	}
}

export function updateName(newName: String, user: User): IUserActionWithPayload<String> {
	return {
		type: Types.updateName,
		user: user.id,
		payload: newName
	};
}


export function firebaseUser(newUserState: UserState): IUserActionWithPayload<UserState> {
	return {
		type: Types.firebaseUser,
		user: "",
		payload: newUserState
	}
}
