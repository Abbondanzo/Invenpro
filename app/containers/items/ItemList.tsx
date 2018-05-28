import * as React from "react";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import { IAction } from "actions/helpers";
import * as ItemActions from "actions/itemActions";
import { ItemListPage, IProps } from "components/items/ItemListPage";
import { IState } from "reducers";

function mapStateToProps(state: IState): Partial<IProps> {
	return {}
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
	return bindActionCreators(ItemActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(
	ItemListPage
) as any) as React.StatelessComponent<IProps>;