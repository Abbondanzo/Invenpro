import * as React from 'react';
import { User } from 'reducers/user';

let styles = require('./UserDropdownPage.scss');

export interface IProps {
    selected: string; // User UUID
    possibleUsers: Array<User>;
    handleChange(user: User): any;
    enableOnClickOutside(): void;
    disableOnClickOutside(): void;
}

interface IState {
    selected: User | null;
    possibleUsers: Array<User>;
    isOpen: Boolean;
}

function mapUserIdToUser(userId: string, users: Array<User>): User | null {
    let user = users.find((user: User) => {
        return user.id === userId;
    });
    return user ? user : null;
}

export class UserDropdownPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            selected: mapUserIdToUser(this.props.selected, Object.values(this.props.possibleUsers)),
            possibleUsers: this.props.possibleUsers,
            isOpen: false
        };
    }

    handleClickOutside() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <div
                className={this.state.isOpen ? styles['is-open'] : undefined}
                onClick={() => {
                    this.setState({ isOpen: true });
                }}
            >
                <span>{this.state.selected ? this.state.selected.name : 'Select who paid'}</span>
                {this.state.selected ? (
                    <input type="hidden" value={this.state.selected.id}>
                        {this.state.selected.name}
                    </input>
                ) : (
                    undefined
                )}
                <div className={styles['options-container']}>
                    <ul>
                        {this.state.possibleUsers.map((user: User) => {
                            return <li key={user.id}>{user.name}</li>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
