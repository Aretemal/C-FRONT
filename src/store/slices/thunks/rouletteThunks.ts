import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { IError } from '../interfaces/allInterfaces';
import { rouletteAPI } from '../../../api/api';

interface IGetRouletteResultRequest {
  token: string,
  selectedNumber: string,
}
interface IGetRouletteResponse {
    id: string,
    type: string,
    attributes: {
        result: string,
        isWin: boolean,
    }
}

export const getRouletteResult = createAsyncThunk<
  IGetRouletteResponse, IGetRouletteResultRequest,
  { dispatch: AppDispatch, rejectValue: IError[] }>(
    'roulette/getRouletteResult',
    async (data, { rejectWithValue }) => {
      const response = await rouletteAPI.getResult(data);
      if (response.data.errors) {
        return rejectWithValue(response.data.errors);
      }
      return response.data.data;
    },
  );
