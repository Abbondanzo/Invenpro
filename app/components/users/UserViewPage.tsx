import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from 'reducers/user';
import { Item } from 'reducers/item';

export interface IProps extends RouteComponentProps<any> {
    user: User;
    listOfItems: Array<Item>;
}

export class UserViewPage extends React.Component<IProps> {
    render() {
        return (
            <div>
                <div>{this.props.user.name}</div>
                <div className="item-container">
                    <ul>
                        {this.props.listOfItems.map((item: Item) => {
                            return <li key={item.id}>{item.name}</li>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
