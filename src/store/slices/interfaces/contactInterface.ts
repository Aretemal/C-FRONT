export interface IUser {
    type: string,
    id: string,
    attributes: {
        firstName: string,
        lastName: string,
        status: string,
        login: string,
        email: string,
    }
}
export interface IContactState {
    friends: IUser[],
    subscribers: IUser[],
    subscriptions: IUser[],
}
