import './style.scss';

import * as React from 'react';

import { User } from '@app/models';

export namespace UserDropdown {
    export interface Props {
        selected: string; // User UUID
        possibleUsers: Array<User>;
        handleChange(user: User): any;
    }
    export interface State {
        selected: User | null;
        possibleUsers: Array<User>;
        isOpen: boolean;
    }
}

function mapUserIdToUser(userId: string, users: Array<User>): User | null {
    let user = users.find((user: User) => {
        return user.id === userId;
    });
    return user ? user : null;
}

export class UserDropdown extends React.Component<UserDropdown.Props, UserDropdown.State> {
    constructor(props: UserDropdown.Props) {
        super(props);

        this.state = {
            selected: mapUserIdToUser(this.props.selected, this.props.possibleUsers),
            possibleUsers: this.props.possibleUsers,
            isOpen: false
        };
        this.handleSelected = this.handleSelected.bind(this);
    }

    handleSelected(user: User) {
        this.setState(
            {
                selected: user,
                isOpen: false
            },
            this.props.handleChange(user)
        );
    }

    handleClickOutside() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <div className={['form-row', this.state.isOpen ? 'is-open' : ''].join(' ')}>
                <span
                    onClick={() => {
                        this.setState({ isOpen: true });
                    }}
                    className={['input', this.state.isOpen ? 'open' : undefined].join(' ')}
                >
                    {this.state.selected ? this.state.selected.name : 'Select who paid'}
                </span>
                {this.state.selected ? (
                    <input type="hidden" value={this.state.selected.id} />
                ) : (
                    undefined
                )}
                <div
                    className={[
                        'floating-container',
                        this.state.isOpen ? 'open-container' : 'closed-container'
                    ].join(' ')}
                >
                    <ul>
                        {this.state.possibleUsers.map((user: User) => {
                            return (
                                <li key={user.id} onClick={() => this.handleSelected(user)}>
                                    {user.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}