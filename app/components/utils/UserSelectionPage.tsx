import * as React from 'react';
import { User } from 'reducers/user';

export interface IProps {
    selected: Array<User | string>; // Array of user UUIDs or generic names
    getSuggestionsForInput(input: string): Array<User>; // Generates a list of "suggestions" of users matching the given input
    handleChange(users: Array<string>): any;
}

interface IState {
    input: string;
    selectedUsers: Array<User | string>;
    suggestions: Array<User>;
}

export class UserSelectionPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            input: '',
            selectedUsers: this.props.selected,
            suggestions: []
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    mapNameToUser(name: string) {}

    onInputChange(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        let value = event.currentTarget.value;
        let lastCharacter = value.slice(value.length - 1);
        if (lastCharacter === ',') {
            value = value.slice(0, value.length - 1);
            this.handleSaveUser(value);
        }
        this.setState({
            input: value,
            suggestions: this.props.getSuggestionsForInput(value)
        });
    }

    onKeyPressed(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 27) {
            // Escape key
            this.setState({
                suggestions: []
            });
        } else if (event.keyCode === 13) {
            // Enter key
            this.handleSaveUser(event.currentTarget.value);
        }
    }

    handleSaveUser(user: string) {
        let userToSave =
            this.state.suggestions.length && this.state.suggestions[0]
                ? this.state.suggestions[0]
                : user.trim();
        let newSelectedUsers = this.state.selectedUsers;
        if (user && !newSelectedUsers.includes(userToSave)) {
            newSelectedUsers.push(userToSave);
            console.log(newSelectedUsers);
            this.setState(
                {
                    selectedUsers: newSelectedUsers
                },
                this.handleChange
            );
        }
    }

    handleChange() {
        this.props.handleChange(
            this.state.selectedUsers.map((user: User | string) => {
                return typeof user === 'string' ? user : user.id;
            })
        );
    }

    render() {
        return (
            <div className="form-row">
                <ul>
                    {this.state.selectedUsers.map((user: User | string, index: number) => {
                        return <li key={index}>{typeof user === 'string' ? user : user.name}</li>;
                    })}
                </ul>
                <input
                    type="text"
                    placeholder={this.state.selectedUsers.length > 0 ? '' : "Type a user's name"}
                    name="userSelectionPage"
                    value={this.state.input}
                    onChange={this.onInputChange}
                    onKeyDown={this.onKeyPressed}
                />
                <label htmlFor="userSelectionPage">Users</label>
                {this.state.suggestions.length ? (
                    <ul>
                        {this.state.suggestions.map((user: User, index: number) => {
                            return <li key={index}>{user.name}</li>;
                        })}
                    </ul>
                ) : (
                    undefined
                )}
            </div>
        );
    }
}
