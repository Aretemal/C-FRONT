import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError } from '../interfaces/allInterfaces';
import { AppDispatch } from '../../store';
import { profileAPI } from '../../../api/api';

interface ILRResponse {
  id: string,
  type: string,
  attributes: {
      firstName: string,
      lastName: string,
      login: string,
      email: string,
  },
}
interface IGetProfileData {
    token: string,
    id: string,
}
export const getInfoAuthUser = createAsyncThunk<
    ILRResponse, IGetProfileData,
    { dispatch: AppDispatch, rejectValue: IError[] }>(
      'profile/getInfoAuthUser',
      async ({ token, id }, { rejectWithValue }) => {
        const response = await profileAPI.getInfoAuthUser({ id, token });
        if (response.data.errors) {
          return rejectWithValue(response.data.errors);
        }
        return response.data.data;
      },
    );
