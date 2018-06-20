import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Payment, PaymentMap } from 'reducers/payment';

export interface IProps extends RouteComponentProps<any> {
    paymentMap: PaymentMap;
    getNameFromUserId(userId: string): string;
    selectUser(userId: string): string;
    unselectPayment(): void;
}

export class PaymentsListPage extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Payee</th>
                            <th>Amount</th>
                            <th>Recipient</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.props.paymentMap).map((key: string) => {
                            let payment: Payment = this.props.paymentMap[key];
                            if (payment) {
                                return (
                                    <tr key={key}>
                                        <td>
                                            <Link
                                                to="/users/view-user"
                                                onClick={() => {
                                                    this.props.selectUser(payment.payee);
                                                }}
                                            >
                                                {this.props.getNameFromUserId(payment.payee)}
                                            </Link>
                                        </td>
                                        <td>{payment.amount}</td>
                                        <td>
                                            <Link
                                                to="/users/view-user"
                                                onClick={() => {
                                                    this.props.selectUser(payment.recipient);
                                                }}
                                            >
                                                {this.props.getNameFromUserId(payment.recipient)}
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            }
                            return undefined;
                        })}
                    </tbody>
                </table>
                <div data-tid="addButton">
                    <Link to="/payments/edit" onClick={this.props.unselectPayment}>
                        Add payment
                    </Link>
                </div>
            </div>
        );
    }
}
