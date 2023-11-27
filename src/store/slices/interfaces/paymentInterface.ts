import {IError} from "./allInterfaces";

export interface IPaymentInitialState {
    balance: string,
    errors: IError[]
};