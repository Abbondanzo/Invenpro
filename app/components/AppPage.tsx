import * as React from 'react';
import Sidebar from "containers/utils/Sidebar";
import { IStatus } from 'reducers/util';
import { Status } from 'reducers/util';

let styles = require("./AppPage.scss");

export interface IProps {
	status: IStatus,
	hideStatus(): void
}

type MessageItem = {
	body: string;
	hasDisplayed: boolean;
	classList: Array<string>;
}

export class AppPage extends React.Component<IProps, { message: MessageItem, timeoutId: number | null }> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			message: {
				body: "",
				classList: [styles['status-container']],
				hasDisplayed: false
			},
			timeoutId: null
		}

		this.hideMessage = this.hideMessage.bind(this)
	}

	componentDidMount() {
		this.displaySuccess()
		this.displayError()
	}

	componentDidUpdate(previousProps: IProps) {
		if (this.props.status && previousProps.status) {
			if (this.props.status.success
				&& this.props.status.success.message
				&& this.props.status.success.message !== previousProps.status.success.message) {
				this.setState({
					message: Object.assign({}, this.state.message, { hasDisplayed: false })
				}, () => {
					this.displaySuccess()
				})
			} else if (this.props.status.error
				&& this.props.status.error.message
				&& this.props.status.error.message !== previousProps.status.error.message) {
				this.setState({
					message: Object.assign({}, this.state.message, { hasDisplayed: false })
				}, () => {
					this.displayError()
				})
			}
		}
	}

	displaySuccess() {
		let newClassList = [styles['status-container'], styles['status-success']]
		if (this.props.status && this.props.status.success) {
			this.showMessage(newClassList, this.props.status.success)
		}
	}

	displayError() {
		let newClassList = [styles['status-container'], styles['status-error']]
		if (this.props.status && this.props.status.error) {
			this.showMessage(newClassList, this.props.status.error)
		}
	}

	setStateTimeout(timeoutFunction: Function, timeoutDuration: number) {
		if (this.state.timeoutId) {
			window.clearTimeout(this.state.timeoutId)
		}
		let timeoutId = window.setTimeout(timeoutFunction, timeoutDuration)
		this.setState({ timeoutId: timeoutId })
	}

	showMessage(classList: string[], propItem: Status) {
		if (!this.state.message.hasDisplayed) {
			// Append fading animation
			classList.push(styles['slide-in'])
			// Remove slide-out class
			classList = classList.filter((className: string) => className !== styles['slide-out'])
			// Assign new classlist and display status
			let newStatus = Object.assign({}, this.state.message, {
				classList: classList,
				hasDisplayed: true,
				body: propItem.message
			})
			this.setState({ message: newStatus })
		}
		// Add timeout handler
		let defaultTimeout: number = propItem.timeout ? propItem.timeout : 5000
		this.setStateTimeout(() => { this.hideMessage() }, defaultTimeout)
	}

	hideMessage() {
		let classList = this.state.message.classList
		let hasBeenHidden = classList.indexOf(styles['slide-out']) !== -1
		if (this.state.message.hasDisplayed && !hasBeenHidden) {
			// Append sliding out animation
			classList.push(styles['slide-out'])
			// Remove slide-in class
			classList = classList.filter((className: string) => className !== styles['slide-in'])
			// Assign new classlist
			let newStatus = Object.assign({}, this.state.message, { classList: classList })
			this.setState(Object.assign({}, this.state, { message: newStatus }))
		}
		// Wait for animation to finish before removing status
		this.setStateTimeout(() => { this.deleteMessage() }, 250)
	}

	deleteMessage() {
		this.setState({
			message: Object.assign({}, this.state.message, { body: "" })
		})
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
						this.state.message.hasDisplayed && this.state.message.body ?
							<div onClick={this.hideMessage} className={this.state.message.classList.join(' ')}>
								{this.state.message.body}
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
