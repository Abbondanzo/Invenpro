import {
    Types as PaymentActionTypes,
    IPaymentAction,
    IPaymentActionWithPayload
} from 'actions/paymentActions';
import * as ReducerHelper from 'reducers/helper';

export type Payment = ReducerHelper.IObjectWithId & {
    payee: string; // User UUID who paid the recipient
    amount: number;
    recipient: string; // User UUID who was paid by the payee
};

export type PaymentMap = ReducerHelper.IObjectMap<Payment>;

export type PaymentState = ReducerHelper.IStateWithMap<Payment>;

export const initialState: PaymentState = ReducerHelper.initialState;

export default function payment(
    state: PaymentState = initialState,
    action: IPaymentAction
): PaymentState {
    if (!PaymentActionTypes) {
        return state;
    }

    if (isActionWithPayload(action)) {
        return paymentWithPayload(state, action as IPaymentActionWithPayload<any>);
    }

    switch (action.type) {
        default:
            return state;
    }
}

/**
 * Returns if the given object is a payload action. That is, the object has a 'payload' parameter.
 * @param object action to test
 */
function isActionWithPayload(object: any): Boolean {
    return 'payload' in object;
}

/**
 * Returns if the given object is a Payment. That is, the object has an 'payee' parameter.
 * @param object action to test
 */
function isPayment(object: any): object is Payment {
    return <Payment>object !== undefined && (<Payment>object).payee !== undefined;
}

/**
 *
 * @param state
 * @param action
 */
function paymentWithPayload<T>(
    state: PaymentState = initialState,
    action: IPaymentActionWithPayload<T>
): PaymentState {
    if (!state.map) {
        return state;
    }

    let oldPayment = state.map[action.transactionId];
    switch (action.type) {
        case PaymentActionTypes.addPayment:
            if (isPayment(action.payload)) {
                return ReducerHelper.addObject(state, action.payload);
            }
        case PaymentActionTypes.editPayment:
            if (oldPayment) {
                let newPayment = Object.assign({}, oldPayment, action.payload);
                return ReducerHelper.editObject(state, action.transactionId, newPayment);
            } else {
                if (isPayment(action.payload)) {
                    return ReducerHelper.addObject(state, action.payload);
                }
            }

        default:
            return state;
    }
}
