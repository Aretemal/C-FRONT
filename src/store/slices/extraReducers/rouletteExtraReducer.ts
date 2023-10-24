import { ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit';
import { IRouletteInitialState } from '../interfaces/postInterface';
import { getRouletteResult } from '../thunks/rouletteThunks';

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
const postsExtraReducers = (builder: ActionReducerMapBuilder<IRouletteInitialState>) => {
  builder
    .addCase(getRouletteResult.pending, (state) => {
      state.errors = [];
    })
    .addCase(getRouletteResult.fulfilled, (state, action) => {
      state.isWin = action.payload.attributes.isWin;
      state.result = action.payload.attributes.result;
    })
    .addMatcher(isError, (state, action) => {
      state.errors = action.payload;
    });
};
export default postsExtraReducers;
