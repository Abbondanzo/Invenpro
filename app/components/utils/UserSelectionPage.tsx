import * as React from 'react';
import { User } from 'reducers/user';

let styles = require('./UserSelectionPage.scss');

export interface IProps {
    selected: Array<User | string>; // Array of user UUIDs or generic names
    getSuggestionsForInput(input: string): Array<User>; // Generates a list of "suggestions" of users matching the given input
    handleChange(users: Array<string>): any;
}

interface IState {
    input: string;
    inputClasses: Array<string>;
    selectedUsers: Array<User | string>;
    suggestions: Array<User>;
}

export class UserSelectionPage extends React.Component<IProps, IState> {
    private userInput: React.RefObject<HTMLInputElement>;
    constructor(props: IProps) {
        super(props);
        this.state = {
            input: '',
            inputClasses: ['input', styles['input']],
            selectedUsers: this.props.selected,
            suggestions: []
        };

        this.userInput = React.createRef();

        this.onInputChange = this.onInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.focusOnInput = this.focusOnInput.bind(this);
        this.toggleInputClass = this.toggleInputClass.bind(this);
    }

    componentDidMount() {
        this.toggleInputClass(
            'small-label',
            this.state.input.length > 0 || this.state.selectedUsers.length > 0
        );
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
        this.produceSuggestions(value);
        this.toggleInputClass(
            'small-label',
            value.length > 0 || this.state.selectedUsers.length > 0
        );
    }

    produceSuggestions(inputValue: string) {
        let suggestedUsers = this.props.getSuggestionsForInput(inputValue);
        this.setState(
            {
                input: inputValue
            },
            () => {
                this.updateSuggestedUsers(suggestedUsers);
            }
        );
    }

    updateSuggestedUsers(suggestedUsers: Array<User>) {
        suggestedUsers = suggestedUsers.filter((user: User) => {
            return this.state.selectedUsers.indexOf(user) === -1;
        });
        this.setState({
            suggestions: suggestedUsers
        });
    }

    onBlur() {
        this.toggleInputClass('open', false);
    }

    onFocus() {
        this.toggleInputClass('open', true);
    }

    focusOnInput() {
        if (this.userInput.current) {
            this.userInput.current.focus();
        }
    }

    toggleInputClass(className: string, shouldAdd: Boolean) {
        let newClassNames = this.state.inputClasses;
        newClassNames = newClassNames.filter((existingClassName: string) => {
            return existingClassName !== className;
        });
        if (shouldAdd) {
            newClassNames.push(className);
        }
        this.setState({
            inputClasses: newClassNames
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
        } else if (event.keyCode === 8) {
            // Backspace key
            // If there is no input, remove the last user and replace the input with their name
            if (this.state.input === '') {
                let lastUser: User | string = this.state.selectedUsers[
                    this.state.selectedUsers.length - 1
                ];
                // Don't try to erase undefined users
                if (!lastUser) {
                    return;
                }
                let newInput = typeof lastUser === 'string' ? lastUser : lastUser.name;
                this.setState(
                    {
                        input: newInput + ' ',
                        selectedUsers: this.state.selectedUsers.slice(
                            0,
                            this.state.selectedUsers.length - 1
                        )
                    },
                    () => {
                        this.produceSuggestions(newInput);
                    }
                );
            }
        }
    }

    handleSaveUser(user: string) {
        let userToSave =
            this.state.suggestions.length && this.state.suggestions[0]
                ? this.state.suggestions[0]
                : user.trim();
        let newSelectedUsers = this.state.selectedUsers;
        if ((user || userToSave) && !newSelectedUsers.includes(userToSave)) {
            newSelectedUsers.push(userToSave);
            this.setState(
                {
                    input: '',
                    selectedUsers: newSelectedUsers
                },
                () => {
                    this.handleChange();
                    this.updateSuggestedUsers(this.state.suggestions);
                }
            );
        }
    }

    handleRemoveUser(user: string | User) {
        if (user) {
            let newSelectedUsers = this.state.selectedUsers;
            let index = newSelectedUsers.indexOf(user, 0);
            if (index > -1) {
                newSelectedUsers.splice(index, 1);
            }
            this.setState(
                {
                    selectedUsers: newSelectedUsers
                },
                () => {
                    this.handleChange();
                    this.updateSuggestedUsers(this.state.suggestions);
                }
            );
        }
    }

    handleChange() {
        this.toggleInputClass(
            'small-label',
            this.state.input.length > 0 || this.state.selectedUsers.length > 0
        );
        this.props.handleChange(
            this.state.selectedUsers.map((user: User | string) => {
                return typeof user === 'string' ? user : user.id;
            })
        );
    }

    render() {
        return (
            <div className={['form-row', styles.container].join(' ')}>
                <div
                    onClick={this.focusOnInput}
                    onMouseDown={this.focusOnInput}
                    className={this.state.inputClasses.join(' ')}
                >
                    <ul className={styles['user-names']}>
                        {this.state.selectedUsers.map((user: User | string, index: number) => {
                            return (
                                <li key={index}>
                                    {typeof user === 'string' ? user : user.name}
                                    <span
                                        onClick={() => {
                                            this.handleRemoveUser(user);
                                        }}
                                    >
                                        &times;
                                    </span>
                                </li>
                            );
                        })}
                        <li className={styles['input-container']}>
                            <input
                                type="text"
                                placeholder={
                                    this.state.selectedUsers.length > 0 ? '' : "Type a user's name"
                                }
                                name="userSelectionPage"
                                ref={this.userInput}
                                value={this.state.input}
                                onChange={this.onInputChange}
                                onKeyDown={this.onKeyPressed}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                className={styles['user-input']}
                            />
                        </li>
                    </ul>
                </div>
                <label htmlFor="userSelectionPage">Users</label>
                {this.state.suggestions.length ? (
                    <ul className={'floating-container ' + styles['suggestions-container']}>
                        {this.state.suggestions.map((user: User, index: number) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        this.handleSaveUser('');
                                    }}
                                >
                                    {user.name}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    undefined
                )}
            </div>
        );
    }
}
