import * as React from 'react';
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import * as UtilActions from "actions/utilActions";
import { IAction } from "actions/helpers";
import { AppPage, IProps } from "components/AppPage";
import { IState } from "reducers";

function mapStateToProps(state: IState): Partial<IProps> {
    return {
        status: state.util.status
    }
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(UtilActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(AppPage) as any) as React.StatelessComponent;