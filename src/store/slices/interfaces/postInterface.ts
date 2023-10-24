export interface IError {
    status: string,
    title: string,
    detail: string,
}
export interface IRouletteInitialState {
    isWin: boolean,
    result: string,
    errors: IError[],
}
