import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { User, UserMap } from 'reducers/user';

let styles = require('./UserList.scss');

export interface IProps extends RouteComponentProps<any> {
    userMap: UserMap;
    selectUser(userId: string): void;
    unselectUser(): void;
}

export class UserListPage extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.selectUser = this.selectUser.bind(this);
    }

    selectUser(userId: string) {
        this.props.selectUser(userId);
    }

    render() {
        return (
            <div className={styles.userList}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.props.userMap).map((key: string) => {
                            let user: User = this.props.userMap[key];
                            if (user && user.id) {
                                return (
                                    <tr key={key}>
                                        <td>
                                            <Link
                                                to="/users/view-user"
                                                onClick={() => {
                                                    this.selectUser(user.id);
                                                }}
                                            >
                                                {user.name}
                                            </Link>
                                        </td>

                                        <td>
                                            <Link
                                                to="/users/user"
                                                onClick={() => {
                                                    this.selectUser(user.id);
                                                }}
                                            >
                                                <button
                                                    onClick={() => {
                                                        this.selectUser(user.id);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            }
                            return undefined;
                        })}
                    </tbody>
                </table>
                <div data-tid="addButton">
                    <Link to="/users/user" onClick={this.props.unselectUser}>
                        Add user
                    </Link>
                </div>
            </div>
        );
    }
}
