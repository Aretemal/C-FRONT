import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hook/hook';
import Login from './Login';
import { authentication } from '../../store/slices/thunks/authThunks';

const LoginContainer:React.FC = () => {
  const {
    isAuth, authLogin,
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onAuthentication = ({ login, password }: { login: string, password: string}) => {
    dispatch(authentication({ login, password }));
  };

  return (
    <Login
      authLogin={authLogin}
      isAuth={isAuth}
      onAuthentication={onAuthentication}
    />
  );
};
export default LoginContainer;
