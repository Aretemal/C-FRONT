import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, IProfileInitialState } from './interfaces/profileInterface';
import profileExtraReducers from './extraReducers/profileExtraReducer';

const initialState: IProfileInitialState = {
  id: '',
  errors: [],
  profile: {
    login: '',
    firstName: '',
    lastName: '',
    email: '',
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload.profile;
      state.id = action.payload.id;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setLogin: (state, action: PayloadAction<string>) => {
      state.profile.login = action.payload;
    },
  },
  extraReducers: profileExtraReducers,
});
export const {
  setLogin, setProfile, setId,
} = profileSlice.actions;
export default profileSlice.reducer;
