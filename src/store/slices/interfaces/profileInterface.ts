import { IError } from './allInterfaces';

export interface IProfileInitialState {
    id: string,
    errors: IError[],
    profile: {
        firstName: string,
        lastName: string,
        login: string,
        email: string,
    }
}
export interface IProfile {
    id: string,
    profile: {
        firstName: string,
        lastName: string,
        login: string,
        email: string,
    }
}

export interface IUpdateStatus {
    status: string,
    token: string,
}
