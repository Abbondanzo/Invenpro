import * as React from "react";

let styles = require("./Home.scss");

export default class Home extends React.Component {
    render() {
        return (
            <div className={styles.container} data-tid="container">
                <br />
                <h1>Hello, world!!</h1>
            </div>
        );
    }
}
