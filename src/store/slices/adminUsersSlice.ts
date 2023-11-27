import {
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import {IAdminUsersInitialState} from "./interfaces/adminUsersInterface";
import {IUser} from "./interfaces/usersInterface";
import adminUsersExtraReducers from "./extraReducers/adminUsersExtraReducer";

const initialState: IAdminUsersInitialState = {
    users: [],
    errors: [],
};

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
    },
    extraReducers: adminUsersExtraReducers,
});

export const {
    setUsers,
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;
