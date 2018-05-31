import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { AddUserPage, IProps } from 'components/users/AddUserPage';
import * as UserActions from 'actions/userActions';
import { IState } from 'reducers';
import { IAction } from 'actions/helpers';

function mapStateToProps(state: IState): Partial<IProps> {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(UserActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(
    AddUserPage
) as any) as React.StatelessComponent<IProps>;
