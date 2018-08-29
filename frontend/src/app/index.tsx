import { AppContainer } from '@app/containers/AppContainer';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
// import './global.scss';

export const App = hot(module)(() => (
    <Switch>
        <Route path="/" component={AppContainer} />
    </Switch>
));
