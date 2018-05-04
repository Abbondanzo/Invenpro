import * as React from "react";
import { Switch, Route } from "react-router";
import App from "containers/App";
import HomePage from "containers/HomePage";
import UserList from "containers/users/UserList";

export default () => (
	<App>
		<Switch>
			<Route path="/users" component={UserList} />
			<Route path="/" component={HomePage} />
		</Switch>
	</App>
);
