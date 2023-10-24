import { ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit';
import { IProfileInitialState } from '../interfaces/profileInterface';
import { getInfoAuthUser } from '../thunks/profileThunks';

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
const profileExtraReducers = (builder: ActionReducerMapBuilder<IProfileInitialState>) => {
  builder
    .addCase(getInfoAuthUser.pending, (state) => {
      state.errors = [];
    })
    .addCase(getInfoAuthUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.profile = action.payload.attributes;
      state.errors = [];
    })
    .addMatcher(isError, (state, action) => {
      state.errors = action.payload;
    });
};
export default profileExtraReducers;
