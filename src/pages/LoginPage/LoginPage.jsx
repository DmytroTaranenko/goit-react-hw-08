import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import css from './LoginPage.module.css';
import { login } from '../../redux/auth/operations';
import { selectError } from '../../redux/auth/selectors';

const RegisterValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некоректна електронна адреса')
    .required("Електронна адреса є обов'язковим"),
  password: Yup.string()
    .required("Пароль є обов'язковим")
    .min(8, 'Пароль має бути мінімум в 8 символи')
    .max(100, 'Пароль має бути меншим за 100 символів'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  const INITIAL_VALUES = {
    email: '',
    password: '',
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={RegisterValidationSchema}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span>Логін:</span>
            <Field
              className={css.formInput}
              type="text"
              name="email"
              placeholder=""
            />
            <ErrorMessage
              className={css.errorText}
              name="email"
              component="span"
            />
          </label>
          <label className={css.label}>
            <span>Пароль:</span>
            <Field
              className={css.formInput}
              type="password"
              name="password"
              placeholder=""
            />
            <ErrorMessage
              className={css.errorText}
              name="password"
              component="span"
            />
          </label>
          <button type="submit">Увійти</button>
          {error && <div className={css.errorText}>{error}</div>}
        </Form>
      </Formik>
    </>
  );
};

export default LoginPage;
