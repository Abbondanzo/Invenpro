export declare interface User {
    id: string;
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
