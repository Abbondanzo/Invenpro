import { Item } from '@app/models';
import { createAction } from 'redux-actions';

export namespace ItemActions {
    export enum Type {
        ADD_ITEM = 'ADD_ITEM',
        SELECT_ITEM = 'SELECT_ITEM',
        SAVE_ITEM = 'SAVE_ITEM'
    }

    export const addItem = createAction<Item>(Type.ADD_ITEM);
    export const selectItem = createAction<Item['id'] | undefined>(Type.SELECT_ITEM);
    export const saveItem = createAction<Item>(Type.SAVE_ITEM);
}

export type ItemActions = Omit<typeof ItemActions, 'Type'>;
