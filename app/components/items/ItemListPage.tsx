import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { Item, ItemMap } from 'reducers/item';
import { User } from 'reducers/user';

/**
 * Converts number to string with two floating points (a price).
 * @param price price to convert
 */
function convertPriceToString(price: number): string {
    return price.toFixed(2).toString();
}

/**
 * Sorts a list of items by ascending date -- earliest dates first.
 * @param items items to sort
 */
function sortItemsByDate(items: Array<Item>): Array<Item> {
    return items.sort((a: Item, b: Item) => {
        let momentA = moment(a.date);
        let momentB = moment(b.date);
        if (momentA.isBefore(momentB)) return -1;
        if (momentB.isBefore(momentA)) return 1;
        return 0;
    });
}

export interface IProps extends RouteComponentProps<any> {
    itemMap: ItemMap;
    selectItem(itemId: string): any;
    getUserFromId(userId: string): User;
}

export class ItemListPage extends React.Component<IProps> {
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Paid</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortItemsByDate(Object.values(this.props.itemMap)).map((item: Item) => {
                            return (
                                <tr key={item.id}>
                                    <th>{moment(item.date).format('MMM DD')}</th>
                                    <th>{item.name}</th>
                                    <th>{convertPriceToString(item.price)}</th>
                                    <th>{this.props.getUserFromId(item.owner).name}</th>
                                    <th>
                                        <button
                                            onClick={() => {
                                                this.props.selectItem(item.id);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div data-tid="addButton">
                    <Link to="/items/item">Add Item</Link>
                </div>
            </div>
        );
    }
}
