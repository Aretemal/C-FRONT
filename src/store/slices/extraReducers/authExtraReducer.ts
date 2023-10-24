import { ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit';
import { IAuthInitialState } from '../interfaces/authInterface';
import { authentication, registration } from '../thunks/authThunks';

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
const authExtraReducers = (builder: ActionReducerMapBuilder<IAuthInitialState>) => {
  builder
    .addCase(authentication.pending, (state) => {
      state.errors = [];
    })
    .addCase(registration.pending, (state) => {
      state.errors = [];
    })
    .addCase(authentication.fulfilled, (state, action) => {
      state.token = `Bearer ${action.payload.attributes.token}`;
      state.errors = [];
      state.authId = action.payload.id;
      state.authLogin = action.payload.attributes.login;
      state.isAuth = true;
    })
    .addCase(registration.fulfilled, (state, action) => {
      state.token = `Bearer ${action.payload.attributes.token}`;
      state.errors = [];
      state.authId = action.payload.id;
      state.authLogin = action.payload.attributes.login;
      state.isAuth = true;
    })
    .addMatcher(isError, (state, action) => {
      state.errors = action.payload;
    });
};
export default authExtraReducers;
