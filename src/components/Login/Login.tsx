import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { Image } from 'antd';
import { Formik, Form, Field } from 'formik';
import SignInSchema from '../../utils/validators/LoginSchema';
import styles from './Login.module.css';
import MainBack from '../../assets/images/MainBack.png';
import {useAppDispatch, useAppSelector} from "../../hook/hook";
import {getUserRole} from "../../store/slices/selectors/authSelectors";
import {toggleToken} from "../../store/slices/authSlice";

interface IProps {
  onAuthentication: ({ login, password }: { login: string, password: string}) => void, // eslint-disable-line no-unused-vars
  isAuth: boolean,
  authLogin: string,
}
const Login:React.FC<IProps> = ({
  onAuthentication, isAuth, authLogin,
}) => {
  const dispatch = useAppDispatch();

  const role = useAppSelector(getUserRole);

  if (isAuth) {
    if (role === 'user') {
        return <Navigate to={`/main`} />;
    } else if (role === 'admin') {
        return <Navigate to={`/admin/activity`} />;
    } else {
        dispatch(toggleToken)
        return <Navigate to={`/error`} />;
    }
  }
  return (
      <div className={styles.wrapper}>
          <div className={styles.container}>
                  <Formik
                      initialValues={{ login: '', password: '' }}
                      onSubmit={(values) => {
                          onAuthentication({ login: values.login, password: values.password });
                      }}
                      validationSchema={SignInSchema}
                  >
                      {({ errors, touched }) => (
                          <Form className={styles.form}>
                              <h1 className={styles.title}>Sign in</h1>
                              <div className={styles['form-item']}>
                                  <Field
                                      className={styles.field}
                                      placeholder="Your login"
                                      name="login"
                                      placeholderTextColor={"white"}
                                  />
                                  {errors.login && touched.login ? (
                                      <div className={styles.error}>{errors.login}</div>
                                  ) : null}
                              </div>
                              <div className={styles['form-item']}>
                                  <Field
                                      className={styles.field}
                                      placeholder="Your password"
                                      name="password"
                                      type="password"
                                  />
                                  {errors.password && touched.password ? (
                                      <div className={styles.error}>{errors.password}</div>
                                  ) : null}
                              </div>
                              <button
                                  disabled={
                                      (!!(errors.login && touched.login)
                                          || !!(errors.password && touched.password))
                                  }
                                  className={styles.button}
                                  type="submit"
                              >
                                  Sign in
                              </button>
                              <span className={styles.or}> Or </span>
                              <NavLink to="/registration" className={styles.registration}>
                                  Sign up
                              </NavLink>
                          </Form>
                      )}
                  </Formik>
              </div>
      </div>
  );
};

export default Login;
