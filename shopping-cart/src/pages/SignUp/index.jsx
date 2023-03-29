import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login, signUp } from "../../redux/features/userSlice";
import styles from "./signup.module.scss";

function SignUpForm({ user, handleInputChange, handleSubmit }) {
  return (
    <div className={styles.signup__Container}>
      <div className={styles.signup__Content}>
        <h1>Signup</h1>
        <p>We do not share your personal information with anyone.</p>
      </div>
      <form className={styles.signup__Form} onSubmit={handleSubmit} aria-label="signup form">
        <div className={styles.signup__FormGroup}>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            aria-required="true"
            aria-label="firstName"
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        <div className={styles.signup__FormGroup}>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            aria-required="true"
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
        <div className={styles.signup__FormGroup}>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            aria-required="true"
          />
          <label htmlFor="lastName">Email</label>
        </div>
        <div className={styles.signup__FormGroup}>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            aria-required="true"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className={styles.signup__FormGroup}>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputChange}
            aria-required="true"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

function LoginForm({ user, handleInputChange, handleLogin }) {
  return (
    <div className={styles.signup__Container}>
      <div className={styles.signup__Content}>
        <h1>Login</h1>
        <p>Get access to your Orders, Wishlist and Recommendations.</p>
      </div>
      <form className={styles.signup__Form} onSubmit={handleLogin}>
        <div className={styles.signup__FormGroup}>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            aria-required="true"
          />
          <label htmlFor="lastName">Email</label>
        </div>
        <div className={styles.signup__FormGroup}>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            aria-required="true"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function SignUp({ page }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails, isUserLoggedIn } = useSelector((state) => state.users);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(user));
    navigate("/home");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = user;
    const tempUser = userDetails?.filter(
      (eachUser) => eachUser.email === email && eachUser.password === password
    );
    if (tempUser?.length > 0) {
      dispatch(login());
      navigate("/home");
      return;
    }
    console.log("user details doesnt exist");
    return;
  };
  return (
    isUserLoggedIn === true ? (
      <Navigate to="/home" replace />
    ) : (
      <>
      {page === "signup" && (
        <SignUpForm
          user={user}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleLogin={handleLogin}
        />
      )}
      {page === "login" && (
        <LoginForm
          user={user}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleLogin={handleLogin}
        />
      )}
    </>
    )
  );
}

export default SignUp;
