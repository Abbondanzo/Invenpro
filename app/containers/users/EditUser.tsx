import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { EditUserPage, IProps } from 'components/users/EditUserPage';
import * as UserActions from 'actions/userActions';
import { IAction } from 'actions/helpers';
import { IState } from 'reducers';

function mapStateToProps(state: IState): Partial<IProps> {
    let currentUser = state.user.currentUser
        ? state.user.userMap[state.user.currentUser]
        : undefined;
    return {
        user: currentUser
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(UserActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(
    EditUserPage
) as any) as React.StatelessComponent<IProps>;
