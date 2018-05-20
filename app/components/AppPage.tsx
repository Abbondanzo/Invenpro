import * as React from 'react';
import Sidebar from "containers/utils/Sidebar";
import { IStatus, Status } from 'reducers/util';

let styles = require("./App.scss");

export interface IProps {
    status: IStatus,
    hideStatus(): void
}

type State = {
    success: {
        classList: Array<string>;
        information: Status
    };
    error: {
        classList: Array<string>;
        information: Status
    };
}

export class AppPage extends React.Component<IProps, State> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            success: {
                classList: [styles['status-container'], styles['status-success']],
                information: this.props.status.success
            },
            error: {
                classList: [styles['status-container'], styles['status-error']],
                information: this.props.status.error
            }
        }

        this.hideSuccess = this.hideSuccess.bind(this)
        this.hideError = this.hideError.bind(this)
    }

    componentDidMount() {
        this.displaySuccess()
        this.displayError()
    }

    componentDidUpdate() {
        // this.displaySuccess()
        // this.displayError()
    }

    displaySuccess() {
        let status = this.state.success
        if (status.information) {
            // Append fading animation
            let newClassList = status.classList
            newClassList = newClassList.filter(className => className !== styles['slide-out'])
            newClassList.push(styles['slide-in'])
            let newStatus = Object.assign({}, status, {
                classList: newClassList
            })
            this.setState(Object.assign({}, this.state, { success: newStatus }))
            // Time this message out after a time
            setTimeout(() => {
                this.hideSuccess()
            }, status.information.timeout)
        }
    }

    hideSuccess() {
        let status = this.state.success
        let newClassList = status.classList
        // Remove slide-in class
        newClassList = newClassList.filter(className => className !== styles['slide-in'])
        // Add slide-out class
        status.classList.push(styles['slide-out'])
        let newStatus = Object.assign({}, status, {
            classList: newClassList
        })
        this.setState(Object.assign({}, this.state, { success: newStatus }))
        this.props.hideStatus()
    }

    displayError() {
        let status = this.state.error
        if (status.information) {
            // Append fading animation
            let newClassList = status.classList
            newClassList = newClassList.filter(className => className !== styles['slide-out'])
            newClassList.push(styles['slide-in'])
            let newStatus = Object.assign({}, status, {
                classList: newClassList
            })
            this.setState(Object.assign({}, this.state, { success: newStatus }))
            // Time this message out after a time
            setTimeout(() => {
                this.hideError()
            }, status.information.timeout)
        }
    }

    hideError() {
        let status = this.state.error
        let newClassList = status.classList
        // Remove slide-in class
        newClassList = newClassList.filter(className => className !== styles['slide-in'])
        // Add slide-out class
        status.classList.push(styles['slide-out'])
        let newStatus = Object.assign({}, status, {
            classList: newClassList
        })
        this.setState(Object.assign({}, this.state, { error: newStatus }))
        this.props.hideStatus()
    }

    render() {
        return (
            <div className={styles['container']}>
                <div className={styles['sidebar-container']} >
                    <Sidebar />
                </div>
                <div className={styles['content-container']}>
                    {
                        this.state.success.information && this.state.success.information.message ?
                            <div onClick={this.hideSuccess} className={this.state.success.classList.join(' ')}>
                                {this.state.success.information.message}
                                <button type="button" className={styles['close']}>×</button>
                            </div>
                            : null
                    }
                    {
                        this.state.error.information && this.state.error.information.message ?
                            <div onClick={this.hideError} className={this.state.error.classList.join(' ')}>
                                {this.state.error.information.message}
                                <button type="button" className={styles['close']}>×</button>
                            </div>
                            : null
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
}
