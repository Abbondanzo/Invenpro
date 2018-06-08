import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { Item, ItemMap } from 'reducers/item';

export interface IProps extends RouteComponentProps<any> {
    itemMap: ItemMap;
    selectItem(itemId: string): any;
}

export class ItemListPage extends React.Component<IProps> {
    sortItemsByDate(items: Array<Item>): Array<Item> {
        return items.sort((a: Item, b: Item) => {
            let momentA = moment(a.date);
            let momentB = moment(b.date);
            if (momentA.isBefore(momentB)) return -1;
            if (momentB.isBefore(momentA)) return 1;
            return 0;
        });
    }

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
                        {this.sortItemsByDate(Object.values(this.props.itemMap)).map(
                            (item: Item) => {
                                return (
                                    <tr key={item.id}>
                                        <th>{moment(item.date).format('MMM DD')}</th>
                                        <th>{item.name}</th>
                                        <th>{item.price}</th>
                                        <th>{item.owner}</th>
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
                            }
                        )}
                    </tbody>
                </table>
                <div data-tid="addButton">
                    <Link to="/items/item">Add Item</Link>
                </div>
            </div>
        );
    }
}
