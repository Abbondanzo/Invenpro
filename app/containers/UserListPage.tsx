import * as React from "react";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import { UserList, IProps } from "components/users/UserList";
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

export default (connect(mapStateToProps, mapDispatchToProps)(
  UserList
) as any) as React.StatelessComponent<IProps>;
