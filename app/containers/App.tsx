import * as React from 'react';
import Sidebar from "containers/utils/Sidebar";

let styles = require("./App.scss");

export default class App extends React.Component {
    render() {
        return (
            <div className={styles['container']}>
                <div className={styles['sidebar-container']} >
                    <Sidebar />
                </div>
                <div className={styles['content-container']}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
