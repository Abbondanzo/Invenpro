import { ItemActions } from '@app/actions';
import { ItemList } from '@app/components/items/ItemList';
import { User } from '@app/models';
import { AppState } from '@app/reducers';
import omit from '@app/utils/omit';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

const getUserFromId = (state: AppState, userId: string): User => {
    let returnValue: User = {
        id: userId,
        name: userId
    };
    // Object.values(state.user.map).map((user: User) => {
    //     if (user.id === userId) {
    //         returnValue = user;
    //     }
    // });
    return returnValue;
};

const mapStateToProps = (state: AppState): Partial<ItemList.Props> => {
    return {
        items: state.items.itemMap.toArray(),
        getUserFromId: getUserFromId.bind(null, state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<ItemList.Props> => {
    return {
        actions: bindActionCreators({ ...omit(ItemActions, 'Type') }, dispatch)
    };
};

const ItemListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList as any);

export default (withRouter(ItemListContainer as any) as any) as React.ComponentClass;
