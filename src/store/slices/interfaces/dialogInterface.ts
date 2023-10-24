export interface IMessageItem {
    id: string,
    type: string,
    attributes: {
        message: string,
        senderId: string,
    }
}
export interface IDialogItem {
    id: string,
    type: string,
    attributes: {
        name: string,
    }
}
export interface IUserItem {
    attributes: {
        ava: any,
        email: string,
        firstName: string,
        lastName: string,
        login: string,
        status: string,
    },
    id: string,
    links: {
        self: string,
    },
    type: string,
}
export interface ISetMessage {
    data: IMessageItem[],
    included: IUserItem[],
}
export interface IDialog {
    messages: IMessageItem[],
    dialogs: IDialogItem[],
    activeId: string,
    senders: IUserItem[],
    usersCount: number,
}
export interface IGetAllMessages{
    token: string,
    dialogId: string,
    socket: any,
    userId: string,
}

export interface ISendMessage{
    token: string,
    id: string,
    message: string,
    socket: any,
}
