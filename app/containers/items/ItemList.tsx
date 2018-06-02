import * as React from 'react';
import { Switch, Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { IAction } from 'actions/helpers';
import * as ItemActions from 'actions/itemActions';
import { ItemListPage, IProps } from 'components/items/ItemListPage';
import { IState } from 'reducers';
import ItemFields from 'containers/items/ItemFields';

function mapStateToProps(state: IState): Partial<IProps> {
    return {
        itemMap: state.item.itemMap
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(ItemActions as any, dispatch);
}

const itemComponent = (connect(mapStateToProps, mapDispatchToProps)(
    ItemListPage
) as any) as React.StatelessComponent<IProps>;

export default (): any => (
    <div>
        <h1>Items</h1>
        <Switch>
            <Route path="/items/item" component={ItemFields} />
            <Route exact path="/items" component={itemComponent} />
        </Switch>
    </div>
);
