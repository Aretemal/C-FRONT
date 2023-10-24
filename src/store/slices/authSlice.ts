import {
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { IAuthInitialState } from './interfaces/authInterface';
import authExtraReducers from './extraReducers/authExtraReducer';

const initialState: IAuthInitialState = {
  isAuth: false,
  token: '',
  authLogin: '',
  authId: '',
  errors: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.authLogin = action.payload;
    },
    toggleToken: (state) => {
      if (state.token) {
        state.token = '';
        state.isAuth = false;
        state.authId = '';
        state.authLogin = '';
      }
    },
  },
  extraReducers: authExtraReducers,
});

export const {
  toggleToken, setLogin,
} = authSlice.actions;

export default authSlice.reducer;
