import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError } from '../interfaces/allInterfaces';
import { AppDispatch } from '../../store';
import { adminUsersAPI } from '../../../api/api';
import {IUser} from "../interfaces/usersInterface";

interface IGetAllUsersForAdminResponse {
    data: IUser[],
}
interface IGetAllUsersForAdmin {
    token: string,
    size: string,
    page: string,
}

export const getAllUsersForAdmin = createAsyncThunk<
    IGetAllUsersForAdminResponse,
    IGetAllUsersForAdmin,
    { dispatch: AppDispatch, rejectValue: IError[] }
>(
    'aUsers/getAllUsersForAdmin',
    async (data, { rejectWithValue }) => {
        const response = await adminUsersAPI.getAllUsersForAdmin(data);
        if (response.data.errors) {
            return rejectWithValue(response.data.errors);
        }
        return response.data;
    },
);
