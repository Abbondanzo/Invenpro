import * as React from 'react';

let styles = require('./HomePage.scss');

export default class HomePage extends React.Component {
    render() {
        return (
            <div className={styles.container} data-tid="container">
                <br />
                <h1>Hello, world!</h1>
            </div>
        );
    }
}
