import {get} from "lodash";

export const getBalanceFromStore = (state) => get(state, ['payments', 'balance'], '0');