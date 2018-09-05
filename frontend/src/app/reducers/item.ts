import { ItemActions } from '@app/actions';
import { Item } from '@app/models';
import { Map } from 'immutable';
import { Action, handleActions } from 'redux-actions';
import { ItemState } from './item';

export interface ItemState {
    itemMap: Map<string, Item>;
}
const initialState: ItemState = {
    itemMap: Map()
};

export const itemReducer = handleActions<ItemState, any>(
    {
        [String(ItemActions.addItem.pending)]: (state, action: Action<Item>): ItemState => {
            console.log('PENDING!', state, action.payload);
            return state;
        },
        [String(ItemActions.addItem.fulfilled)]: (state, action: Action<Item>): ItemState => {
            const item = action.payload;
            if (item) {
                return {
                    ...state,
                    itemMap: state.itemMap.set(item.id, item)
                };
            }
            return state;
        }
    },
    initialState
);
