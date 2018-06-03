import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { FirebasePage, IProps } from 'components/settings/FirebasePage';
import * as UtilActions from 'actions/utilActions';
import { IAction } from 'actions/helpers';
import * as Firebase from 'utils/firebaseMiddleware';
import { getApiKey } from 'utils/firebaseMiddleware';
import { IState } from 'reducers';

function mapStateToProps(state: IState): Partial<IProps> {
    let keylessConfig = state.util.firebaseConfig;
    return {
        apiKey: getApiKey(keylessConfig.projectId),
        keylessConfig: Object.assign(keylessConfig, {
            apiKey: ''
        })
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(Object.assign({}, UtilActions, Firebase), dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(
    FirebasePage
) as any) as React.StatelessComponent<IProps>;
