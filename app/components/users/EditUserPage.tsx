import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from 'reducers/user';

export interface IProps extends RouteComponentProps<any> {
    editUser(oldUser: User, newUser: User): void;
    user: User;
}

export class EditUserPage extends React.Component<IProps, { user: User }> {
    constructor(props: IProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.saveUser = this.saveUser.bind(this);

        // If the user gets undefined, go back to the list
        if (!this.props.user) {
            this.goBack();
        }
        // Otherwise, set this component's state
        this.state = {
            user: this.props.user
        };
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
        this.props.editUser(this.props.user, this.state.user);
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
                        Edit
                    </button>
                </div>
            </div>
        );
    }
}
