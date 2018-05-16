import * as React from "react";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import { FirebasePage, IProps } from "components/settings/FirebasePage";
import * as UtilActions from "actions/utilActions";
import * as Firebase from "utils/firebaseMiddleware";
import { IState } from "reducers";
import { IAction } from "actions/helpers";

function mapStateToProps(state: IState): Partial<IProps> {
    let keylessConfig = state.util.firebaseConfig
    let config = Object.assign(keylessConfig, {
        apiKey: ""
    })
    // Config
    return {
        config: config
    }
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(Object.assign({}, UtilActions, Firebase), dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(
    FirebasePage
) as any) as React.StatelessComponent<IProps>;