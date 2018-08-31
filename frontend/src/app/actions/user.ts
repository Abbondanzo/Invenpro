import { User } from '@app/models';
import { createAction } from 'redux-actions';

/**
 * These are users contained within a project. Please note that a member is the authorized end user
 * who navigates the project but a user is simply metadata associated with purchases.
 */
export namespace UserActions {
    export enum Type {
        ADD_USER = 'ADD_USER',
        SELECT_USER = 'SELECT_USER',
        EDIT_USER = 'EDIT_USER'
    }

    export const addUser = createAction<User>(Type.ADD_USER);
    export const selectUser = createAction<User['id'] | undefined>(Type.SELECT_USER);
    export const editUser = createAction<User>(Type.EDIT_USER);
}

export type UserActions = Omit<typeof UserActions, 'Type'>;
