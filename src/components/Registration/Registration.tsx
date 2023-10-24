import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';
import SignupSchema from '../../utils/validators/RegistrationSchema';
import styles from '../Login/Login.module.css';
import BackgroundLogin from '../../assets/images/BackgroundLogin.jpg';

interface IProps {
  onRegistration: ({
    login, firstName, lastName, password, email, // eslint-disable-line no-unused-vars
  }: { login: string, firstName: string, lastName: string, password: string, email: string }) => void, // eslint-disable-line no-unused-vars
  isAuth: boolean,
  authLogin: string,
}
const Registration: React.FC<IProps> = ({
  onRegistration, isAuth, authLogin,
}) => {
  if (isAuth) {
    return <Navigate to={`/profile/${authLogin}`} />;
  }
  return (
    <div className={styles.container}>
      <img className={styles.backgroundTree} src={BackgroundLogin} alt="BackgroundLogin" />
      <img className={styles.backgroundTree} src={BackgroundLogin} alt="BackgroundLogin" />
      <Formik
        initialValues={{
          login: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          onRegistration({
            login: values.login,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <h1 className={styles.title}>Registration</h1>
            <div className={styles.itemField}>
              <Field
                className={styles.field}
                name="login"
                placeholder='Your login'
              />
              {errors.login && touched.login ? (
                <div className={styles.error}>{errors.login}</div>
              ) : null}
            </div>
            <div className={styles.itemField}>
              <Field
                className={styles.field}
                name="password"
                type="password"
                placeholder="Your password"
              />
              {errors.password && touched.password ? (
                <div className={styles.error}>{errors.password}</div>
              ) : null}
            </div>
            <div className={styles.itemField}>
              <Field
                className={styles.field}
                name="firstName"
                placeholder="First Name"
              />
              {errors.firstName && touched.firstName ? (
                <div className={styles.error}>{errors.firstName}</div>
              ) : null}
            </div>
            <div className={styles.itemField}>
              <Field
                className={`${styles.field}`}
                name="lastName"
                placeholder="Last Name"
              />
              {errors.lastName && touched.lastName ? (
                <div className={styles.error}>{errors.lastName}</div>
              ) : null}
            </div>
            <div className={styles.itemField}>
              <Field
                className={styles.field}
                name="email"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <div className={styles.error}>{errors.email}</div>
              ) : null}
            </div>
            <button
              disabled={
                !!(
                  (errors.login && touched.login)
                  || (errors.password && touched.password)
                  || (errors.email && touched.email)
                  || (errors.firstName && touched.firstName)
                  || (errors.lastName && touched.lastName)
                )
              }
              className={styles.button}
              type="submit"
            >
              Send
            </button>
            <span className={styles.or}> Or </span>
            <NavLink to="/login" className={styles.registration}>
              Sign in
            </NavLink>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
