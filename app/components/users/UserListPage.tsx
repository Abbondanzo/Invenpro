import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { User } from "reducers/user";

let styles = require("./UserList.scss");

export interface IProps extends RouteComponentProps<any> {
	userMap: Map<String, User>;
	addUser(): void;
	editUser(user: User): void;
}

export class UserListPage extends React.Component<IProps> {
	render() {
		return (
			<div>
				<div data-tid="backButton">
					<Link to="/">Go back</Link>
				</div>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{
							Array.from(this.props.userMap.keys()).map((key: string) => {
								let value = this.props.userMap.get(key);
								if (value) {
									return (
										<tr key={key}>
											<td>{value.name}</td>
											<td>
												<Link to={{
													pathname: '/users/edit-user',
													search: value.name
												}}>Edit</Link>
											</td>
										</tr>
									);
								}
								return;
							})
						}
					</tbody>
				</table>
				<div data-tid="addButton">
					<Link to="/users/add-user">Add user</Link>
				</div>
			</div>
		);
	}
}
