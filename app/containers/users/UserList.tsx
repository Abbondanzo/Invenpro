import * as React from 'react';
import { Switch, Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { UserListPage, IProps } from 'components/users/UserListPage';
import UserFields from 'containers/users/UserFields';
import UserView from 'containers/users/UserView';
import * as UserActions from 'actions/userActions';
import { IAction } from 'actions/helpers';
import { IState } from 'reducers';

function mapStateToProps(state: IState): Partial<IProps> {
    return {
        userMap: state.user.map ? state.user.map : {}
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(UserActions as any, dispatch);
}

let userComponent = (connect(
    mapStateToProps,
    mapDispatchToProps
)(UserListPage) as any) as React.StatelessComponent<IProps>;

export default (): any => (
    <div>
        <h1>Users</h1>
        <Switch>
            <Route path="/users/view-user" component={UserView} />
            <Route path="/users/user" component={UserFields} />
            <Route exact path="/users" component={userComponent} />
        </Switch>
    </div>
);
