import {get} from "lodash";

export const getUserRole = (state) => get(state, ['auth', 'role'], 'user');

export const getIsAuth = (state) => get(state, ['auth', 'isAuth'], false);
export const getToken = (state) => get(state, ['auth', 'token'], '');