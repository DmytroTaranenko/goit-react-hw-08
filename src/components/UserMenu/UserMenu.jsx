import { NavLink } from 'react-router-dom';
import css from './UserMenu.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';

const UserMenu = () => {
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={css.nav}>
      <NavLink
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
        to={'/contacts'}
      >
        ContactsPage
      </NavLink>
      <div className={css.userMenuWrap}>
        <p>Імʼя: {userInfo.name}</p>
        <p>Електронна адреса: {userInfo.email}</p>
        <button onClick={onLogout} type="button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
