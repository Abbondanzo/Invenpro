import { IItemAction, Types as ItemActionTypes, IItemActionWithPayload } from "actions/itemActions";
import guid from "utils/uuid";

export type Item = {
	owner: string; // User UUID
	name: string;
	id: string; // Identifying UUID (name is not an ID)
	price: number; // Floating point
	upc: number | null;
	users: Array<string>; // A list of UUID who pay for that item. Can include owner
}

export type ItemState = {
	itemMap: Map<string, Item>
}

const initialState: ItemState = {
	itemMap: new Map()
}

/**
 * Reducer over user state.
 * @param state Contains properties to carry into the newly returned state
 * @param action Information containing updates to the state
 */
export default function item(state: ItemState = initialState, action: IItemAction): ItemState {
	if (!ItemActionTypes) {
		return state;
	}

	// Check if the action contains a payload, and return the state if it does
	if (isActionWithPayload(action)) {
		return itemWithPayload(state, action);
	}

	switch (action.type) {
		case ItemActionTypes.deleteItem:
			let map = state.itemMap
			if (action.item) {
				map.delete(action.item)
			}
			return { itemMap: map }
		default:
			return state;
	}
}

/**
 * Returns if the given object is a payload action. That is, the object has a 'value' parameter.
 * @param object action to test
 */
function isActionWithPayload(object: any): object is IItemActionWithPayload<any> {
	return 'payload' in object;
}

/**
 * Returns if the given object is an Item. That is, the object has an 'owner' parameter.
 * @param object action to test
 */
function isItem(object: any): object is Item {
	return (<Item>object).owner !== undefined;
}

/**
 * Performs actions over items in the state with updated value information.
 * @param state State containing information about the items
 * @param action Action that contains a payload to update the item with
 */
function itemWithPayload<T>(state: ItemState = initialState, action: IItemActionWithPayload<T>): ItemState {
	switch (action.type) {
		case ItemActionTypes.addItem:
			if (isItem(action.payload)) {
				let map = state.itemMap
				let uuid = getNewUUID(map)
				let oldItem: Item = action.payload
				let newItem: Item = Object.assign({}, oldItem, { id: uuid })
				map.set(uuid, newItem)
				return {
					itemMap: map
				}
			}
		case ItemActionTypes.editItem:
			if (action.item && isItem(action.payload)) {
				return {
					itemMap: editItem(action.item, action.payload, state.itemMap)
				}
			}

		default:
			return state;
	}
}

function getNewUUID(itemMap: Map<string, Item>): string {
	let uuid = guid()
	// Generate a new UUID if the map already contains one. Only a 1.06*10^51 chance.
	while (itemMap.get(uuid)) {
		uuid = guid()
	}
	return uuid
}

function editItem(itemId: string, item: Item, itemMap: Map<string, Item>): Map<string, Item> {
	if (!item.id) {
		item = Object.assign({}, item, { id: itemId })
	}
	let previousItem = itemMap.get(itemId)
	itemMap.set(itemId, Object.assign(previousItem, item))
	return itemMap
}