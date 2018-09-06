import { ItemActions } from '@app/actions';
import { Item, User } from '@app/models';
import { Icon, Table } from 'antd';
import * as moment from 'moment';
import * as React from 'react';

export namespace ItemList {
    export interface Props {
        items: Item[];
        actions: ItemActions;
        getUserFromId(userId: string): User;
    }
    export interface State {}
}

export class ItemList extends React.Component<ItemList.Props, ItemList.State> {
    /**
     * Sorts a list of items by ascending date -- earliest dates first.
     * @param items items to sort
     */
    sortItemsByDate(items: Item[]): Item[] {
        return items.sort((a: Item, b: Item) => {
            const momentA = moment(a.date);
            const momentB = moment(b.date);
            if (momentA.isBefore(momentB)) return -1;
            if (momentB.isBefore(momentA)) return 1;
            return 0;
        });
    }

    /**
     * Converts number to string with two floating points (a price).
     * @param price price to convert
     */
    convertPriceToString(price: number): string {
        return price.toFixed(2).toString();
    }

    render() {
        type Record = {
            key: number;
            date: string;
            name: string;
            price: string;
            owner: string;
        };
        const addItem = () => {
            const newItem = Item.getItem({
                name: 'Item',
                owner: '0sdf0f-sadfasdf-sdafsdfasdf',
                receipt: 'R',
                date: '05/12/1998',
                price: 0.01
            });
            this.props.actions.addItem(newItem);
        };
        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: 'Paid',
                dataIndex: 'owner',
                key: 'owner'
            },
            {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                render: (record: Record) => {
                    return (
                        <span>
                            <Icon type="edit" theme="outlined" />
                        </span>
                    );
                }
            }
        ];
        const dataSource = this.sortItemsByDate(this.props.items).map(
            (item: Item, index: number) => {
                return {
                    key: index,
                    date: item.date,
                    name: item.name,
                    price: this.convertPriceToString(item.price),
                    owner: this.props.getUserFromId(item.owner).name
                } as Record;
            }
        );
        return (
            <div className="widget">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ position: 'both' }}
                />
                {/* <table>
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
                        {this.sortItemsByDate(this.props.items).map((item: Item) => {
                            return (
                                <tr key={item.id}>
                                    <th>{moment(item.date).format('MMM DD')}</th>
                                    <th>{item.name}</th>
                                    <th>{this.convertPriceToString(item.price)}</th>
                                    <th>{this.props.getUserFromId(item.owner).name}</th>
                                    <th>
                                        <Link to="/items/item">
                                            <div
                                                onClick={() => {
                                                    this.props.actions.selectItem(item.id);
                                                }}
                                            >
                                                <Icon type="edit" theme="outlined" />
                                            </div>
                                        </Link>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table> */}
                <div data-tid="addButton">
                    {/* <Link to="/items/item">Add Item</Link> */}
                    <button onClick={addItem}>Click</button>
                </div>
            </div>
        );
    }
}
