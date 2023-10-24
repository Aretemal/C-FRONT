export interface ISettingsInitialState {
  isChangePassword: boolean,
  lang: string
}
export interface IChangeLangData {
  token: string,
  lang: string,
}
export interface IChangePasswordData {
  token: string,
  newPassword: string,
}
