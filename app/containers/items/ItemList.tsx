import * as React from 'react';
import { Switch, Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { IAction } from 'actions/helpers';
import * as ItemActions from 'actions/itemActions';
import { ItemListPage, IProps } from 'components/items/ItemListPage';
import { IState } from 'reducers';
import { User } from 'reducers/user';
import ItemFields from 'containers/items/ItemFields';

function mapStateToProps(state: IState): Partial<IProps> {
    return {
        itemMap: state.item.map ? state.item.map : {},
        getUserFromId: getUserFromId.bind(null, state)
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(ItemActions as any, dispatch);
}

function getUserFromId(state: IState, userId: string): User {
    let returnValue: User = {
        id: userId,
        name: userId
    };
    if (state && state.user && state.user.map && userId) {
        Object.values(state.user.map).map((user: User) => {
            if (user.id === userId) {
                returnValue = user;
            }
        });
    }
    return returnValue;
}

const itemComponent = (connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemListPage) as any) as React.StatelessComponent<IProps>;

export default (): any => (
    <div>
        <h1>Items</h1>
        <Switch>
            <Route path="/items/item" component={ItemFields} />
            <Route exact path="/items" component={itemComponent} />
        </Switch>
    </div>
);
