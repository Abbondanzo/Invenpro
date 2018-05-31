import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { User, UserMap } from "reducers/user";

let styles = require("./UserList.scss");

export interface IProps extends RouteComponentProps<any> {
	userMap: UserMap;
	editUser(user: User): void;
	selectUser(userId: string): void;
}

export class UserListPage extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.selectUser = this.selectUser.bind(this);
	}

	selectUser(userId: string) {
		this.props.selectUser(userId)
	}

	render() {
		return (
			<div className={styles.userList}>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{
							Object.keys(this.props.userMap).map((key: string) => {
								let user: User = this.props.userMap[key]
								if (user && user.id) {
									return (
										<tr key={key}>
											<td>{user.name}</td>
											<td>
												<button onClick={() => { this.selectUser(user.id) }}>Edit</button>
											</td>
										</tr>
									);
								}
								return undefined
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
