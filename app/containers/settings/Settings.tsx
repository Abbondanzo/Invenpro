import * as React from 'react';
import { Switch, Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { SettingsPage, IProps } from 'components/settings/SettingsPage';
import Firebase from './Firebase';
import * as UtilActions from 'actions/utilActions';
import { IAction } from 'actions/helpers';
import { IState } from 'reducers';

function mapStateToProps(state: IState): Partial<IProps> {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(UtilActions as any, dispatch);
}

let settingsComponent = (connect(mapStateToProps, mapDispatchToProps)(
    SettingsPage
) as any) as React.StatelessComponent<IProps>;

export default (): any => (
    <div>
        <h1>Settings</h1>
        <Switch>
            <Route path="/settings/firebase" component={Firebase} />
            <Route exact path="/settings" component={settingsComponent} />
        </Switch>
    </div>
);
