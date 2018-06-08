import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { IAction } from 'actions/helpers';
import * as UserActions from 'actions/userActions';
import { UserSelectionPage, IProps } from 'components/utils/UserSelectionPage';
import { IState } from 'reducers';
import { User, UserMap } from 'reducers/user';

function replaceUUIDWithUser(userMap: UserMap, selectedUsers: Array<any>): Array<User | string> {
    if (selectedUsers) {
        return selectedUsers.map((name: any) => {
            return (userMap[name] ? userMap[name] : name) as User | string;
        });
    }
    return [];
}

function mapStateToProps(state: IState, ownProps: IProps): Partial<IProps> {
    return {
        selected: replaceUUIDWithUser(state.user.userMap, ownProps.selected),
        getSuggestionsForInput: getSuggestionsForInput.bind(null, state)
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(Object.assign({}, UserActions, getSuggestionsForInput), dispatch);
}

/**
 * Given an input, returns a list of users that contain that input somewhere in the user's name.
 * @param state contains a map of users
 * @param input string to check for in a user's name
 */
function getSuggestionsForInput(state: IState, input: string): Array<User> {
    if (state && state.user && state.user.userMap && input) {
        return Object.values(state.user.userMap).filter((user: User) => {
            return user.name && user.name.toLowerCase().includes(input.toLowerCase());
        });
    }

    return [];
}

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSelectionPage) as any) as React.StatelessComponent<any>;
