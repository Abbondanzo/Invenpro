import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from 'reducers/user';

export interface IProps extends RouteComponentProps<any> {
    addUser(user: User): void;
    editUser(oldUser: User, newUser: User): void;
    user: User;
}

interface IState {
    user: User;
    isEditing: boolean;
}

export class UserFieldsPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        let emptyUser: User = {
            id: '',
            name: ''
        };

        this.state = {
            user: this.props.user ? this.props.user : emptyUser,
            isEditing: this.props.user ? true : false
        };

        this.handleChange = this.handleChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        let name = event.currentTarget.value;
        this.setState({
            user: Object.assign(this.state.user, {
                name: name
            })
        });
    }

    saveUser() {
        if (this.state.isEditing) {
            this.props.editUser(this.props.user, this.state.user);
        } else {
            this.props.addUser(this.state.user);
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.goBack} data-tclass="btn">
                    Go Back
                </button>
                <div>
                    <div className="form-row">
                        <input
                            name="username"
                            type="text"
                            value={this.state.user.name}
                            onChange={this.handleChange}
                            required
                        />
                        <label htmlFor="username">Name</label>
                    </div>
                    <button onClick={this.saveUser} data-tclass="btn">
                        {this.state.isEditing ? 'Save' : 'Add'}
                    </button>
                </div>
            </div>
        );
    }
}
