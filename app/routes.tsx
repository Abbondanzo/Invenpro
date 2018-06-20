import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import ItemList from 'containers/items/ItemList';
import UserList from 'containers/users/UserList';
import PaymentsList from 'containers/payments/PaymentsList';
import Settings from 'containers/settings/Settings';

export default () => (
    <App>
        <Switch>
            <Route path="/settings" component={Settings} />
            <Route path="/payments" component={PaymentsList} />
            <Route path="/users" component={UserList} />
            <Route path="/items" component={ItemList} />
            <Route path="/" component={Home} />
        </Switch>
    </App>
);
