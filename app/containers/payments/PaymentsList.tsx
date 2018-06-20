import * as React from 'react';
import { Switch, Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import UserFields from 'containers/users/UserFields';
import UserView from 'containers/users/UserView';
import * as PaymentActions from 'actions/paymentActions';
import { IAction } from 'actions/helpers';
import { PaymentsListPage, IProps } from 'components/payments/PaymentsListPage';
import { IState } from 'reducers';
import { User } from 'reducers/user';

function mapStateToProps(state: IState): Partial<IProps> {
    return {
        paymentMap: state.payment.map || {},
        getNameFromUserId: getNameFromUserId.bind(null, state)
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): Partial<IProps> {
    return bindActionCreators(PaymentActions as any, dispatch);
}

function getNameFromUserId(state: IState, userId: string): string {
    let user: User = state.user.map[userId];
    return user.name || 'N/A';
}

let paymentComponent = (connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentsListPage) as any) as React.StatelessComponent<IProps>;

export default (): any => (
    <div>
        <h1>Payments</h1>
        <Switch>
            <Route path="/payments/view" component={UserView} />
            <Route path="/payments/edit" component={UserFields} />
            <Route exact path="/payments" component={paymentComponent} />
        </Switch>
    </div>
);
