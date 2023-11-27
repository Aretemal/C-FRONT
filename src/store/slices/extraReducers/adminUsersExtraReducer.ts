import { ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit';
import {IAdminUsersInitialState} from "../interfaces/adminUsersInterface";
import {getAllUsersForAdmin} from "../thunks/adminUsersThunks";

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
const adminUsersExtraReducers = (builder: ActionReducerMapBuilder<IAdminUsersInitialState>) => {
  builder
    .addCase(getAllUsersForAdmin.pending, (state) => {
      state.errors = [];
    })
    .addCase(getAllUsersForAdmin.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.errors = [];
    })
    .addMatcher(isError, (state, action) => {
      state.errors = action.payload;
    });
};
export default adminUsersExtraReducers;
