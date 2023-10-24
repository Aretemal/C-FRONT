import React from 'react';
import Registration from './Registration';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { registration } from '../../store/slices/thunks/authThunks';

const RegistrationContainer: React.FC = () => {
  const { isAuth, authLogin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onRegistration = ({
    login, firstName, lastName, password, email,
  }:
    { login: string, firstName: string, lastName: string, password: string, email: string }) => {
    dispatch(registration({
      login, firstName, lastName, password, email,
    }));
  };

  return (
    <Registration
      authLogin={authLogin}
      isAuth={isAuth}
      onRegistration={onRegistration}
    />
  );
};
export default RegistrationContainer;
