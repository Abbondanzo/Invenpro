import * as React from "react";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import { EditUserPage, IProps } from "components/users/EditUserPage";
import * as UserActions from "actions/userActions";
import { IState } from "reducers";
import { User } from "reducers/user";
import { IAction } from "actions/helpers";

function mapStateToProps(state: IState, ownProps: any): Partial<IProps> {
	let nameSearch = ownProps.match.params.name;
	let name = "";
	if (nameSearch) {
		name = nameSearch.slice(1, nameSearch.length);
	}

	return {
		user: getUserById(name)
	};
}

function getUserById(name: string): User {
	return {
		name: name
	}
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
	return bindActionCreators(UserActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(
	EditUserPage
) as any) as React.StatelessComponent<IProps>;