import { Action } from "redux";
import { User } from "../reducers/user";

export const Types = {
  addUser: "ADD_USER",
  updateName: "UPDATE_NAME"
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
