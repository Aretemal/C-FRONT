import { createSlice } from '@reduxjs/toolkit';
import rouletteExtraReducers from './extraReducers/rouletteExtraReducer';
import { IRouletteInitialState } from './interfaces/postInterface';

const initialState: IRouletteInitialState = {
  isWin: false,
  result: '',
  errors: [],
};

const rouletteSlice = createSlice({
  name: 'roulette',
  initialState,
  reducers: {},
  extraReducers: rouletteExtraReducers,
});

export default rouletteSlice.reducer;
