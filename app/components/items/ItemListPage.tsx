import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Item } from "reducers/item"

export interface IProps extends RouteComponentProps<any> {
	itemMap: Map<string, Item>
}

export class ItemListPage extends React.Component<IProps> {
	render() {
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Item</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{
							Object.keys(this.props.itemMap).map((itemKey: string) => {
								let item = this.props.itemMap.get(itemKey)
								if (item) {
									return (
										<tr>
											<th>{item.id}</th>
											<th>{item.price}</th>
										</tr>
									)
								}
								return undefined
							})
						}
					</tbody>
				</table>
			</div>

		)
	}
}