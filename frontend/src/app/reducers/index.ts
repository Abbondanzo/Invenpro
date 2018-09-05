import { ObjectWithId } from '@app/models';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { itemReducer, ItemState } from './item';

export interface AppState {
    router: RouterState;
    items: ItemState;
}

export const rootReducer = combineReducers<AppState>({
    router: routerReducer as any,
    items: itemReducer as any
});

/**
 * Here we are storing the map as an object for the sake of Firebase's inability to store maps in
 * its Realtime Database.
 */
class ObjectMap<T extends ObjectWithId> {
    private map: {
        [key: string]: T;
    };
    constructor() {
        this.map = {};
    }
    put(object: T) {
        this.map[object.id] = object;
    }
    get(objectId: string) {
        return this.map[objectId];
    }
    delete(objectId: string) {
        return delete this.map[objectId];
    }
    clear() {
        this.map = {};
    }
    getSize() {
        return Object.keys(this.map).length;
    }
    entries() {
        return Object.keys(this.map);
    }
    values() {
        return Object.keys(this.map).map((val) => {
            return this.map[val];
        });
    }
}

export { ObjectWithId, ObjectMap };
