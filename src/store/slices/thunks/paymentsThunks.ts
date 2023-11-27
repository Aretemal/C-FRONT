import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { IError } from '../interfaces/allInterfaces';
import {paymentAPI, rouletteAPI} from '../../../api/api';

interface IGetBalanceRequest {
  token: string,
}
interface IGetBalanceResponse {
    id: string,
    type: string,
    attributes: {
        balance: string,
        isWin: boolean,
    }
}

export const getBalance = createAsyncThunk<
    IGetBalanceResponse, IGetBalanceRequest,
  { dispatch: AppDispatch, rejectValue: IError[] }>(
    'payments/getBalance',
    async (data, { rejectWithValue }) => {
      const response = await paymentAPI.getBalance(data);
      if (response.data.errors) {
        return rejectWithValue(response.data.errors);
      }
      return response.data.data;
    },
  );

interface IUpdateBalanceRequest {
    token: string,
    amount: string,
}
interface IUpdateBalanceResponse {
    id: string,
    type: string,
    attributes: {
        balance: string,
    }
}

export const updateBalance = createAsyncThunk<
    IUpdateBalanceResponse, IUpdateBalanceRequest,
  { dispatch: AppDispatch, rejectValue: IError[] }>(
    'payments/updateBalance',
    async (data, { rejectWithValue }) => {
      const response = await paymentAPI.updateBalance(data);
      if (response.data.errors) {
        return rejectWithValue(response.data.errors);
      }
      return response.data.data;
    },
  );
