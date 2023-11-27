import { IError } from './allInterfaces';
import { IUser } from "./usersInterface";

export interface IAdminUsersInitialState {
    users: IUser[],
    errors: IError[],
}
