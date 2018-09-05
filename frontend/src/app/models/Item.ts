import { User } from '@app/models';
import { ObjectWithId } from './index';

export interface Item extends ObjectWithId {
    name: string;
    owner: User['id']; // User UUID
    receipt: string; // Receipt UUID (for batch adds)
    date: string; // MM/DD/YYYY
    price: number; // Floating point
    upc: number | null;
    users: Array<User['id']>; // A list of UUID who pay for that item. Can include owner
}

export namespace Item {
    export const getItem = (data: {
        id: string;
        name: string;
        owner: User['id'];
        receipt: string;
        date: string;
        price: number;
        upc?: number;
        users?: Array<User['id']>;
    }): Item => {
        return {
            id: data.id || '',
            name: data.name || '',
            owner: data.owner,
            receipt: data.receipt,
            date: data.date,
            price: data.price,
            upc: data.upc || null,
            users: data.users || []
        };
    };
}
