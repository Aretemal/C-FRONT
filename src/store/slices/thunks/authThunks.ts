import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError } from '../interfaces/allInterfaces';
import { AppDispatch } from '../../store';
import { authAPI } from '../../../api/api';

interface ILRResponse {
  id: string,
  type: string,
  attributes: {
    token: string,
    login: string,
  },
}
interface IAuthenticationData {
  login: string,
  password: string,
}

export const authentication = createAsyncThunk<
    ILRResponse,
  IAuthenticationData,
  { dispatch: AppDispatch, rejectValue: IError[] }
>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    const response = await authAPI.authentication(data);
    if (response.data.errors) {
      return rejectWithValue(response.data.errors);
    }
    return response.data.data;
  },
);

interface IRegistrationData {
  login: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
}
export const registration = createAsyncThunk<
  ILRResponse, IRegistrationData,
  { dispatch: AppDispatch, rejectValue: IError[] }>(
    'auth/registration',
    async (data, { rejectWithValue }) => {
      const response = await authAPI.registration(data);
      if (response.data.errors) {
        return rejectWithValue(response.data.errors);
      }
      return response.data.data;
    },
  );
