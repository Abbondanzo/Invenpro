import { App } from '@app/components/App';
import { AppState } from '@app/reducers';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

function mapStateToProps(state: AppState): Partial<App.Props> {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>): Partial<App.Props> {
    return bindActionCreators(Object.assign({}), dispatch);
}

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App) as React.ComponentClass;
