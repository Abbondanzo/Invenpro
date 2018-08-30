import { App } from '@app/components/App';
import { AppState } from '@app/reducers';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

function mapStateToProps(state: AppState): Partial<App.Props> {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch): Partial<App.Props> {
    return bindActionCreators(Object.assign({}), dispatch);
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App as any);

export default (withRouter(AppContainer as any) as any) as React.ComponentClass;
