import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { IAction } from 'actions/helpers';
import * as UserActions from 'actions/userActions';
import { UserDropdownPage, IProps } from 'components/utils/UserDropdownPage';
import { IState } from 'reducers';
import onClickOutside from 'react-onclickoutside';

function mapStateToProps(state: IState, ownProps: IProps): Partial<IProps> {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(UserActions as any, dispatch);
}

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(onClickOutside(UserDropdownPage) as any) as any) as React.StatelessComponent<any>;
