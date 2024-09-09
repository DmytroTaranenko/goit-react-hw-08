import AppBar from "../AppBar/AppBar";
import Navigation from "../Navigation/Navigation";

const Layout = ({children}) => {
  return (
    <>
      <header >
        <AppBar />
      </header>
      {children}
    </>
  );
};

export default Layout;
