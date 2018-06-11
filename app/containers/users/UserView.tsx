import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { IAction } from 'actions/helpers';
import * as UserActions from 'actions/userActions';
import { UserViewPage, IProps } from 'components/users/UserViewPage';
import { IState } from 'reducers';
import { User } from 'reducers/user';
import { Item } from 'reducers/item';

function getItemsOwnedByUser(state: IState, userId: string): Array<Item> {
    return Object.values(state.item.itemMap).filter((item: Item) => {
        return item.owner === userId;
    });
}

function mapStateToProps(state: IState): Partial<IProps> {
    let user: User | undefined;
    if (state.user.currentUser) {
        user = state.user.userMap[state.user.currentUser];
        return {
            user: user,
            listOfItems: getItemsOwnedByUser(state, state.user.currentUser)
        };
    }
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(UserActions as any, dispatch);
}

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(UserViewPage) as any) as React.StatelessComponent<IProps>;
