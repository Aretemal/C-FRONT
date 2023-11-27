import { createSlice } from '@reduxjs/toolkit';
import {IPaymentInitialState} from "./interfaces/paymentInterface";
import paymentsExtraReducers from "./extraReducers/paymentsExtraReducer";

const initialState: IPaymentInitialState = {
    balance: '',
    errors: []
};

const rouletteSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: paymentsExtraReducers,
});

export default rouletteSlice.reducer;
