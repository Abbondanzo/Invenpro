import { Action } from "redux";
import { Item, ItemState } from "reducers/item";

export const Types = {
	addItem: "ADD_ITEM",
	editItem: "EDIT_ITEM",
	deleteItem: "DELETE_ITEM",
	addUser: "ADD_USER_TO_ITEM",
	deleteUser: "DELETE_USER_FROM_ITEM",
	editOwner: "EDIT_OWNER",
	firebaseItem: "FIREBASE_ITEM_UPDATE"
}

/**
 * An action over a single (existing) item.
 */
export interface IItemAction extends Action {
	readonly type: string;
	readonly item: string | null;
}

/**
 * An action over an existing item with a payload.
 */
export interface IItemActionWithPayload<T> extends IItemAction {
	readonly payload: T
}

export function firebaseItem(itemState: ItemState): IItemActionWithPayload<ItemState> {
	return {
		type: Types.firebaseItem,
		item: null,
		payload: itemState
	}
}

export function addItem(item: Item): IItemActionWithPayload<Item> {
	return {
		type: Types.addItem,
		item: null,
		payload: item
	}
}

export function editItem(id: string, item: Item): IItemActionWithPayload<Item> {
	return {
		type: Types.editItem,
		item: id,
		payload: item
	}
}

export function deleteItem(id: string): IItemAction {
	return {
		type: Types.deleteItem,
		item: id
	}
}

export function addUser(itemId: string, userId: string): IItemActionWithPayload<string> {
	return {
		type: Types.addUser,
		item: itemId,
		payload: userId
	}
}

export function deleteUser(itemId: string, userId: string): IItemActionWithPayload<string> {
	return {
		type: Types.deleteUser,
		item: itemId,
		payload: userId
	}
}

export function editOwner(itemId: string, userId: string): IItemActionWithPayload<string> {
	return {
		type: Types.editOwner,
		item: itemId,
		payload: userId
	}
}