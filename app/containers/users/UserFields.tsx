import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { UserFieldsPage, IProps } from 'components/users/UserFieldsPage';
import * as UserActions from 'actions/userActions';
import { IAction } from 'actions/helpers';
import { IState } from 'reducers';

function mapStateToProps(state: IState): Partial<IProps> {
    let currentUser = state.user.current ? state.user.map[state.user.current.id] : undefined;
    return {
        user: currentUser
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(UserActions as any, dispatch);
}

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(UserFieldsPage) as any) as React.StatelessComponent<IProps>;
