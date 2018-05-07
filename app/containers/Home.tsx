import * as React from "react";
import { RouteComponentProps } from "react-router";
import HomePage from "components/HomePage";

export class Home extends React.Component<RouteComponentProps<any>, void> {
    render() {
        return <HomePage />;
    }
}

export default (HomePage as any) as React.StatelessComponent<RouteComponentProps<any>>;
