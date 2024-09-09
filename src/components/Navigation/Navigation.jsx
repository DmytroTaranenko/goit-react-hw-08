import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <>
      <nav className={css.nav}>
        <NavLink className={({ isActive }) => clsx(css.link, isActive && css.active)} to={'/'}>HomePage</NavLink>
      </nav>
    </>
  );
};

export default Navigation;
