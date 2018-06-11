import guid from 'utils/uuid';

interface IObjectWithId {
    readonly id: string;
}

/**
 * ====================================
 * Object Map
 * ====================================
 */

/**
 * Interface representing a map of objects (with id) with keys of the id.
 */
interface IObjectMap<T extends IObjectWithId> {
    [key: string]: T;
}

function _addObject<T extends IObjectWithId>(object: T, map: IObjectMap<T>): IObjectMap<T> {
    let uuid = guid();
    // Generate a new UUID if the map already contains one. Only a 1.06*10^51 chance.
    while (map[uuid]) {
        uuid = guid();
    }
    let newObject = Object.assign({}, object, { id: uuid });
    map[uuid] = newObject;
    return map;
}

function _editObject<T extends IObjectWithId>(
    oldObjectId: string,
    newObject: T,
    map: IObjectMap<T>
): IObjectMap<T> {
    let modifiedObject = Object.assign({}, newObject, { id: oldObjectId });
    map[oldObjectId] = modifiedObject;
    return map;
}

function _deleteObject<T extends IObjectWithId>(
    oldObjectId: string,
    map: IObjectMap<T>
): IObjectMap<T> {
    delete map[oldObjectId];
    return map;
}

/**
 * ====================================
 * State Interfacing
 * ====================================
 */

const initialState: IStateWithMap<any> = {
    current: null,
    map: []
};

function isState(object: any): object is IStateWithMap<any> {
    return (
        <IStateWithMap<any>>object !== undefined && (<IStateWithMap<any>>object).map !== undefined
    );
}

interface IStateWithMap<T extends IObjectWithId> {
    readonly current: T | null;
    readonly map: IObjectMap<T>;
}

function addObject<T extends IObjectWithId>(state: IStateWithMap<T>, object: T): IStateWithMap<T> {
    return { ...state, map: _addObject(object, state.map) };
}

function editObject<T extends IObjectWithId>(
    state: IStateWithMap<T>,
    oldObjectId: string,
    newObject: T
): IStateWithMap<T> {
    return { ...state, map: _editObject(oldObjectId, newObject, state.map) };
}

function deleteObject<T extends IObjectWithId>(
    state: IStateWithMap<T>,
    oldObjectId: string
): IStateWithMap<T> {
    return { ...state, map: _deleteObject(oldObjectId, state.map) };
}

function selectObject<T extends IObjectWithId>(
    state: IStateWithMap<T>,
    objectId: string
): IStateWithMap<T> {
    return { ...state, current: state.map[objectId] };
}

function unselectObject<T extends IObjectWithId>(state: IStateWithMap<T>): IStateWithMap<T> {
    return { ...state, current: null };
}

export {
    addObject,
    editObject,
    deleteObject,
    selectObject,
    unselectObject,
    IStateWithMap,
    IObjectMap,
    IObjectWithId,
    initialState,
    isState
};
