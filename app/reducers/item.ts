import { IItemAction, Types as ItemActionTypes, IItemActionWithPayload } from 'actions/itemActions';
import * as ReducerHelper from 'reducers/helper';

export const DATE_FORMAT = 'MM/DD/YYYY';

export type Item = ReducerHelper.IObjectWithId & {
    name: string;
    owner: string; // User UUID
    receipt: string; // Receipt UUID (for batch adds)
    date: string; // MM/DD/YYYY
    price: number; // Floating point
    upc: number | null;
    users: Array<string>; // A list of UUID who pay for that item. Can include owner
};

export type ItemMap = ReducerHelper.IObjectMap<Item>;

export type ItemState = ReducerHelper.IStateWithMap<Item>;

export const initialState: ItemState = ReducerHelper.initialState;

/**
 * Reducer over user state.
 * @param state Contains properties to carry into the newly returned state
 * @param action Information containing updates to the state
 */
export default function item(state: ItemState = initialState, action: IItemAction): ItemState {
    if (!ItemActionTypes) {
        return state;
    }

    // Initialize the map if reset
    if (!state.map) {
        state = { ...state, map: {} };
    }

    // Check if the action contains a payload, and return the state if it does
    if (isActionWithPayload(action)) {
        return itemWithPayload(state, action as IItemActionWithPayload<any>);
    }

    switch (action.type) {
        case ItemActionTypes.deleteItem:
            if (action.item) {
                return ReducerHelper.deleteObject(state, action.item);
            }
        case ItemActionTypes.selectItem:
            if (action.item) {
                return ReducerHelper.selectObject(state, action.item);
            }
        case ItemActionTypes.unselectItem:
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
 * Returns if the given object is an Item. That is, the object has an 'owner' parameter.
 * @param object action to test
 */
function isItem(object: any): object is Item {
    return <Item>object !== undefined && (<Item>object).owner !== undefined;
}

/**
 * Performs actions over items in the state with updated value information.
 * @param state State containing information about the items
 * @param action Action that contains a payload to update the item with
 */
function itemWithPayload<T>(
    state: ItemState = initialState,
    action: IItemActionWithPayload<T>
): ItemState {
    switch (action.type) {
        case ItemActionTypes.addItem:
            if (isItem(action.payload)) {
                return ReducerHelper.addObject(state, action.payload);
            }
        case ItemActionTypes.editItem:
            if (action.item && isItem(action.payload)) {
                return ReducerHelper.editObject(state, action.item, action.payload);
            }
        case ItemActionTypes.firebaseItem:
            if (action.payload) {
                return Object.assign(state, action.payload);
            }
        default:
            return state;
    }
}
