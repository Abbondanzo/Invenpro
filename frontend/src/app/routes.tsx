import { Home } from '@app/components/Home';
import { AppContainer } from '@app/containers/AppContainer';
import * as React from 'react';
import { Route, Switch } from 'react-router';

export default () => (
    <AppContainer>
        <Switch>
            {/* <Route path="/settings" component={Settings} />
            <Route path="/payments" component={PaymentsList} />
            <Route path="/users" component={UserList} />
            <Route path="/items" component={ItemList} /> */}
            <Route path="/" component={Home} />
        </Switch>
    </AppContainer>
);
