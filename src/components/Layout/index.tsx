import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';

const Layout = () => {
  const location = useLocation().pathname;
  return (
    <>
      {location === '/chat' ? <Header /> : null}
      <Outlet />
    </>
  );
};

export default Layout;
