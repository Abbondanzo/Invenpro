import { Action } from 'redux';
import { Payment } from 'reducers/payment';

export const Types = {
    addPayment: 'ADD_PAYMENT',
    editPayment: 'EDIT_PAYMENT',
    selectPayment: 'SELECT_PAYMENT',
    unselectPayment: 'UNSELECT_PAYMENT',
    deletePayment: 'DELETE_PAYMENT'
};

export interface IPaymentAction extends Action {
    readonly type: string;
    readonly transactionId: string;
}

export interface IPaymentActionWithPayload<T> extends IPaymentAction {
    readonly payload: T;
}

export function selectPayment(transactionId: string): IPaymentAction {
    return {
        type: Types.selectPayment,
        transactionId: transactionId
    };
}

export function unselectPayment(): IPaymentAction {
    return {
        type: Types.unselectPayment,
        transactionId: ''
    };
}

export function deletePayment(transactionId: string): IPaymentAction {
    return {
        type: Types.deletePayment,
        transactionId: transactionId
    };
}

export function addPayment(payment: Payment): IPaymentActionWithPayload<Payment> {
    return {
        type: Types.addPayment,
        transactionId: '',
        payload: payment
    };
}

export function editPayment(
    transactionId: string,
    payment: Payment
): IPaymentActionWithPayload<Payment> {
    return {
        type: Types.editPayment,
        transactionId: transactionId,
        payload: payment
    };
}
