import * as React from "react";
import { Switch, Route } from "react-router";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import { UserListPage, IProps } from "components/users/UserListPage";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import * as UserActions from "actions/userActions";
import { IState } from "reducers";
import { IAction } from "actions/helpers";

function mapStateToProps(state: IState) {
	return {
		userList: state.user.userList
	};
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
	return bindActionCreators(UserActions as any, dispatch);
}

let userComponent = (connect(mapStateToProps, mapDispatchToProps)(
	UserListPage
) as any) as React.StatelessComponent<IProps>

export default (): any => (
	<div>
		<h1>Users</h1>
		<Switch>
			<Route exact path="/users" component={userComponent} />
			<Route path="/users/add-user" component={AddUser} />
			<Route path="/users/edit-user:name" component={EditUser} />
		</Switch>
	</div>
);

console.log("test")