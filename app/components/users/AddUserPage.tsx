import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { User } from "reducers/user";

export interface IProps extends RouteComponentProps<any> {
    addUser(user: User): void;
}

export class AddUserPage extends React.Component<IProps, { newUser: User }> {
    constructor(props: IProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);

        let initialUser: User = {
            name: ""
        };
        this.state = {
            newUser: initialUser
        };
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        let name = event.currentTarget.value;
        this.setState({
            newUser: {
                name: name
            }
        });
    }

    addUser() {
        this.props.addUser(this.state.newUser);
    }

    render() {
        return (
            <div>
                <div data-tid="backButton">
                    <Link to="/users">Go back</Link>
                </div>
                <span>{this.state.newUser.name}</span>
                <div>
                    <input
                        type="text"
                        value={this.state.newUser.name}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.addUser} data-tclass="btn">
                        Save
          </button>
                </div>
            </div>
        );
    }
}
