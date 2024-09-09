import { NavLink } from 'react-router-dom';
import css from "./AuthNav.module.css"
import clsx from 'clsx';

const AuthNav = () => {
  return (
    <div className={css.nav}>
      <NavLink
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
        to={'/login'}
      >
        LoginPage
      </NavLink>
      <NavLink
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
        to={'/register'}
      >
        RegistrationPage
      </NavLink>
    </div>
  );
};

export default AuthNav;
