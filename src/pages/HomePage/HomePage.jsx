import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.homePageBox}>
      <h1 className={css.homePageTitle}>Welcome to our app contact book</h1>
      {isLoggedIn ? (
        <NavLink className={css.homePageLinkContacts} to="/contacts">Check your contacts</NavLink>
      ) : (
        <div className={css.navLinkWrap}>
          <p className={css.homePageParagraph}>
            Please click the login or sign-up button
          </p>
            <NavLink className={css.homePageLink} to="/login">
              Login
            </NavLink>
            <NavLink className={css.homePageLink} to="/register">
              Sign up
            </NavLink>
        </div>
      )}
    </div>
  );
};

export default HomePage;
