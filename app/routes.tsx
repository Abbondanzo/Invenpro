import * as React from "react";
import { Switch, Route } from "react-router";
import App from "containers/App";
import Home from "containers/Home";
import UserList from "containers/users/UserList";

export default () => (
    <App>
        <Switch>
            <Route path="/users" component={UserList} />
            <Route path="/" component={Home} />
        </Switch>
    </App>
);
