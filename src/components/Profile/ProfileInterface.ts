/* eslint-disable no-unused-vars */

export interface IProfileInfoProps {
    profile: {
        firstName: string,
        lastName: string,
        login: string,
        email: string,
    },
    isAuthProfile: boolean,
}

export interface IProfileStatusProps{
    status: string,
    onUpdateStatus: (status: string) => void,
}
