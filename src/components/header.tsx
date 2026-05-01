import { Link } from 'react-router-dom';
import { routes } from '../shared/constants';
import { HeaderUserNav } from './header-user-nav';

const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link
            to={routes.root}
            className="header__logo-link header__logo-link--active"
          >
            <img
              className="header__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="81"
              height="41"
            />
          </Link>
        </div>
        <HeaderUserNav />
      </div>
    </div>
  </header>
);

export { Header };
