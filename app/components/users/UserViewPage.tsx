import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from 'reducers/user';
import { Item } from 'reducers/item';

export interface IProps extends RouteComponentProps<any> {
    user: User;
    listOfItemsOwned: Array<Item>;
    listOfItemsUsed: Array<Item>;
}

export class UserViewPage extends React.Component<IProps> {
    render() {
        return (
            <div>
                <div>{this.props.user.name}</div>
                <div className="item-container">
                    {this.props.listOfItemsOwned.reduce(
                        (previousValue: number, currentValue: Item) => {
                            return previousValue + currentValue.price;
                        },
                        0
                    )}
                    <ul>
                        Owned
                        {this.props.listOfItemsOwned.map((item: Item) => {
                            return <li key={item.id}>{item.name}</li>;
                        })}
                        Used
                        {this.props.listOfItemsUsed.map((item: Item) => {
                            return <li key={item.id}>{item.name}</li>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
