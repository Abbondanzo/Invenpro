import { AppState } from '@app/reducers';
import { ItemList } from '@ItemList/components/ItemList';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

function mapStateToProps(state: AppState): Partial<ItemList.Props> {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch): Partial<ItemList.Props> {
    return bindActionCreators(Object.assign({}), dispatch);
}

const ItemListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList as any);

export default (withRouter(ItemListContainer as any) as any) as React.ComponentClass;
