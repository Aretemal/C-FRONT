import { IError } from './allInterfaces';

export interface IUser {
    id: string,
    type: string,
    attributes: {
        firstName: string,
        lastName: string,
        status: string,
        login: string,
        email: string,
        followed: string,
    }
}

export interface IUsersInitialState {
    users: IUser[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
    errors: IError[],
}
