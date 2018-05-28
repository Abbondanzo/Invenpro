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
			name: "",
			id: ""
		};
		this.state = {
			newUser: initialUser
		};
	}

	handleChange(event: React.FormEvent<HTMLInputElement>) {
		let name = event.currentTarget.value;
		this.setState({
			newUser: Object.assign(this.state.newUser, {
				name: name
			})
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
				<div>
					<div className="form-row">
						<label htmlFor="username">Name</label>
						<input
							name="username"
							type="text"
							placeholder="Name"
							value={this.state.newUser.name}
							onChange={this.handleChange}
						/>
					</div>
					<button onClick={this.addUser} data-tclass="btn">
						Save
                    </button>
				</div>
			</div>
		);
	}
}
