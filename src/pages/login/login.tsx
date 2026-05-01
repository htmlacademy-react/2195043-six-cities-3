import { type ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header';
import { routes } from '../../shared/constants';
import { LoginData } from '../../shared/types';

type FormData = LoginData;
type Field = keyof typeof initialFormData;

const initialFormData = {
  email: '',
  password: '',
} as const;

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: Field,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  console.log(formData);

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
      <button className="login__submit form__submit button" type="submit">
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
