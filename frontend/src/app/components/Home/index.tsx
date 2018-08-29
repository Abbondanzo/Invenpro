import * as React from 'react';

export namespace Home {
    export interface Props {}
}

export class Home extends React.Component<Home.Props> {
    render() {
        return (
            <div className="container" data-tid="container">
                <h1>Hello, world!</h1>
            </div>
        );
    }
}
