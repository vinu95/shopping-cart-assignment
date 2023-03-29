import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import styles from "./layout.module.scss";

function Header() {
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector((state) => state.users);

  const handleLogout = () => {
    dispatch(logout());
    return;
  };
  return (
    <div className={styles.header__Container}>
      <header>
        <div className={styles.header__NavigationContainer}>
          <Link to="/" className={styles.site__Logo}>
            <img
              src="/static/images/logo.png"
              srcSet="/static/images/logo_2x.png 2x"
              alt="Sabka Bazzar logo"
            />
          </Link>
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
          </nav>
        </div>
        <div className={styles.header__UserActionsContainer}>
          {isUserLoggedIn === true ? (
            <nav>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </nav>
          ) : (
            <nav>
              <Link to="/login">SignIn</Link>
              <Link to="/signup">Register</Link>
            </nav>
          )}
          <button>
            <img src="/static/images/cart.svg" alt="" />
            <span>0 items</span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
