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
    isOpen: boolean;
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
            <div
                className={['form-row', this.state.isOpen ? styles['is-open'] : undefined].join(
                    ' '
                )}
            >
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
                        this.state.isOpen ? styles['open-container'] : styles['closed-container']
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
