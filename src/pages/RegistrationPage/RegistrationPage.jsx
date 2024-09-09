import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import css from './RegistrationPage.module.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Ім'я користувача є обов'язковим")
    .min(2, "Ім'я користувача має бути мінімум в 2 символи")
    .max(100, "Ім'я користувача має бути меншим за 100 символів"),
  email: Yup.string()
    .email('Некоректна електронна адреса')
    .required("Електронна адреса є обов'язковим"),
  password: Yup.string()
    .required("Пароль є обов'язковим")
    .min(8, 'Пароль має бути мінімум в 8 символи')
    .max(100, 'Пароль має бути меншим за 100 символів'),
});

const RegisterPage = () => {
  const dispatch = useDispatch();

  const INITIAL_VALUES = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={RegisterValidationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span>Імʼя користувача</span>
          <Field
            className={css.formInput}
            type="text"
            name="name"
            placeholder=""
          />
          <ErrorMessage
            className={css.errorText}
            name="name"
            component="span"
          />
        </label>
        <label className={css.label}>
          <span>Електронна адреса:</span>
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
        <button type="submit">Зареєструватися</button>
      </Form>
    </Formik>
  );
};

export default RegisterPage;
