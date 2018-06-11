import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { IAction } from 'actions/helpers';
import * as ItemActions from 'actions/itemActions';
import { ItemFieldsPage, IProps } from 'components/items/ItemFieldsPage';
import { IState } from 'reducers';

function mapStateToProps(state: IState): Partial<IProps> {
    return {
        currentItem: state.item.current,
        isBatchAdd: false,
        userMap: state.user.map ? state.user.map : {}
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(ItemActions as any, dispatch);
}

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemFieldsPage) as any) as React.StatelessComponent<IProps>;
