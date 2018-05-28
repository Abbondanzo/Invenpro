import * as React from "react";
import { RouteComponentProps } from "react-router";

export interface IProps extends RouteComponentProps<any> {

}

export class ItemListPage extends React.Component<IProps> {
	render() {
		return (
			<div>Items</div>
		)
	}
}