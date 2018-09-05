import { Home } from '@app/components/Home';
import { ItemFields } from '@app/components/items/ItemFields';
import AppContainer from '@app/containers/AppContainer';
import ItemListContainer from '@app/containers/items/ItemListContainer';
import * as React from 'react';
import { Route, Switch } from 'react-router';

export default () => (
    <AppContainer>
        <Switch>
            {/* <Route path="/settings" component={Settings} />
            <Route path="/payments" component={PaymentsList} />
<Route path="/users" component={UserList} /> */}
            <Route path="/items/item" component={ItemFields} />
            <Route path="/items" component={ItemListContainer} />
            <Route path="/" component={Home} />
        </Switch>
    </AppContainer>
);
