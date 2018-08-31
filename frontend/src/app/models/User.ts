import { ObjectWithId } from './index';

export interface User extends ObjectWithId {
    name: string;
}

export namespace User {
    export const getUser = (data: any): User => {
        return {
            id: data.id || '',
            name: data.name || ''
        };
    };
}
