import { Item } from '@app/models';

export class ItemService {
    static async addItem(item: Item) {
        return new Promise((resolve: (item: Item) => void, reject: any) => {
            resolve(item);
        });
    }
}
