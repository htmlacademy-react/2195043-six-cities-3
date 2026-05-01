import { type ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header';
import { emailRegex, passwordRegex, routes } from '../../shared/constants';
import { failure, success } from '../../shared/result';

type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email: string | null;
  password: string | null;
};

type Field = keyof FormData;

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: null,
    password: null,
  });

  const hasErrors = Object.values(formErrors).some(Boolean);
  const isFormIncomplete = !formData.email || !formData.password;
  const isSubmitDisabled = hasErrors || isFormIncomplete;

  const validatePassword = (password: string) => {
    if (!passwordRegex.test(password)) {
      return failure(
        'Password must be at least 8 characters long and contain numbers, uppercase and lowercase letters',
      );
    }

    return success(password);
  };

  const validateEmail = (email: string) => {
    if (!emailRegex.test(email)) {
      return failure('Email must be a valid email address');
    }

    return success(email);
  };

  const validationField = {
    password: validatePassword,
    email: validateEmail,
  } as const;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: Field,
  ) => {
    const v = validationField[field];
    const result = v(event.target.value);
    if (!result.ok) {
      setFormErrors((prev) => ({ ...prev, [field]: result.error }));
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    }

    if (result.ok) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
      setFormData((prev) => ({ ...prev, [field]: result.value }));
    }
  };

  return (
    <form className="login__form form" action="#" method="post">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(event) => handleInputChange(event, 'email')}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(event) => handleInputChange(event, 'password')}
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={isSubmitDisabled}
      >
        Sign in
      </button>
    </form>
  );
};

const LoginPage = () => (
  <div className="page page--gray page--login">
    <Header />

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm />
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={routes.empty}>
              <span>Amsterdam</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  </div>
);

export { LoginPage };
