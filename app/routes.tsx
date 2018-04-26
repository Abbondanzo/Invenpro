import * as React from "react";
import { Switch, Route } from "react-router";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import NewUser from "./containers/NewUserPage";

export default () => (
    <App>
        <Switch>
            <Route path="/new-user" component={NewUser} />
            <Route path="/" component={HomePage} />
        </Switch>
    </App>
);
