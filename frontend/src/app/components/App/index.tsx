import * as React from 'react';

export namespace App {
    export interface Props {}
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
                    Sidebar
                    {/* <Sidebar /> */}
                </div>
                <div className="content-container">{this.props.children}</div>
            </div>
        );
    }
}
