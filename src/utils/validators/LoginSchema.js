import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  login: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required field'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required field'),
});
export default SignInSchema;
