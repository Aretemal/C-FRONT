import { ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit';
import {getBalance, updateBalance} from '../thunks/paymentsThunks';
import {IPaymentInitialState} from "../interfaces/paymentInterface";

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}
const paymentsExtraReducers = (builder: ActionReducerMapBuilder<IPaymentInitialState>) => {
    builder
        .addCase(getBalance.pending, (state) => {
            state.errors = [];
        })
        .addCase(getBalance.fulfilled, (state, action) => {
            state.balance = action.payload.attributes.balance;
        })
        .addCase(updateBalance.pending, (state) => {
            state.errors = [];
        })
        .addCase(updateBalance.fulfilled, (state, action) => {
            state.balance = action.payload.attributes.balance;
        })
        .addMatcher(isError, (state, action) => {
            state.errors = action.payload;
        });
};
export default paymentsExtraReducers;
