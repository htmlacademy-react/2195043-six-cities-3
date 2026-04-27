import { Outlet } from 'react-router-dom';
import { Header } from './header';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export { Layout };
