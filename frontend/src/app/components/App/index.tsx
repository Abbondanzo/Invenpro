import { Sidebar } from '@app/components/utils/Sidebar';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export namespace App {
    export interface Props extends RouteComponentProps<void> {}
}

export class App extends React.Component<App.Props> {
    constructor(props: App.Props) {
        super(props);
    }

    componentDidMount() {
        // Authentication actions
    }

    render() {
        return (
            <div className="container">
                <div className="sidebar-container">
                    <Sidebar history={this.props.history} location={this.props.location} />
                </div>
                <div className="content-container">{this.props.children}</div>
            </div>
        );
    }
}
