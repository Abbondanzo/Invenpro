import { Action } from "redux";
import { User } from "reducers/user";

const { history } = require('store/configureStore');

export const Types = {
	addUser: "ADD_USER",
	selectUser: "SELECT_USER",
	updateName: "UPDATE_NAME",
	editUser: "EDIT_USER"
};

/**
 * An action over a single user
 */
export interface IUserAction extends Action {
	readonly type: String;
	readonly user: User;
}

/**
 * An action over a single user containing a payload of information
 */
export interface IUserActionPayload<T> extends IUserAction {
	readonly value: T;
}

export function addUser(user: User): IUserAction {
	return {
		type: Types.addUser,
		user: user
	};
}

export function selectUser(user: User): IUserAction {
	history.push('/users/edit-user')
	return {
		type: Types.selectUser,
		user: user
	}
}

export function editUser(oldUser: User, newUser: User): IUserActionPayload<User> {
	return {
		type: Types.editUser,
		user: oldUser,
		value: newUser
	}
}

export function updateName(
	value: String,
	user: User
): IUserActionPayload<String> {
	return {
		type: Types.updateName,
		user: user,
		value: value
	};
}
