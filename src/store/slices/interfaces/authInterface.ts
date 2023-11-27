import { IError } from './allInterfaces';

export interface IAuthInitialState {
    authLogin: string,
    isAuth: boolean,
    token: string,
    authId: string,
    role: string,
    errors: IError[],
}
