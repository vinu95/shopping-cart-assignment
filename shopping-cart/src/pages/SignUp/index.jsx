import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login, signUp } from "../../redux/features/userSlice";
import styles from "./signup.module.scss";

const ErrorIcon =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgaGVpZ2h0PSIzMiIgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7ZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxnIGlkPSJFcnJvcl8xXyI+PGcgaWQ9IkVycm9yIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiBpZD0iQkciIHI9IjE2IiBzdHlsZT0iZmlsbDojRDcyODI4OyIvPjxwYXRoIGQ9Ik0xNC41LDI1aDN2LTNoLTNWMjV6IE0xNC41LDZ2MTNoM1Y2SDE0LjV6IiBpZD0iRXhjbGFtYXRvcnlfeDVGX1NpZ24iIHN0eWxlPSJmaWxsOiNFNkU2RTY7Ii8+PC9nPjwvZz48L2c+PC9zdmc+";

const CheckPasswordValidation = (value) => {
  if (value?.length < 6) {
    return "Password should contain minimum 6 charecters";
  }
  if (value?.indexOf(' ') !== -1) {
    return "Password should not contain white space charecters";
  }
  if(!/^\d*[a-zA-Z][a-zA-Z\d]*$/.test(value)) {
    return "Password should contain alphanumeric charecters";
  }
}
function SignUpForm({ handleFormSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className={styles.signup__Container}>
      <div className={styles.signup__Content}>
        <h1>Signup</h1>
        <p>We do not share your personal information with anyone.</p>
      </div>
      <form
        className={styles.signup__Form}
        onSubmit={handleSubmit(handleFormSubmit)}
        aria-label="signup form"
      >
        <div className={styles.signup__FormGroup}>
          <input
            type="text"
            name="firstName"
            aria-invalid={errors.firstName ? "true" : "false"}
            aria-required="true"
            aria-label="firstName"
            {...register("firstName", { required: true, maxLength: 40 })}
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        {errors?.firstName && (
          <div className={styles.input__Error_Message}>
            <img src={ErrorIcon} alt="" />
            <span role="alert">
              {errors?.firstName?.type && "You must enter your first name"}
            </span>
          </div>
        )}
        <div className={styles.signup__FormGroup}>
          <input
            type="text"
            name="lastName"
            aria-invalid={errors.lastName ? "true" : "false"}
            aria-required="true"
            {...register("lastName", { required: true, maxLength: 40 })}
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
        {errors?.lastName && (
          <div className={styles.input__Error_Message}>
            <img src={ErrorIcon} alt="" />
            <span role="alert">
              {errors?.lastName?.type && "You must enter your last name"}
            </span>
          </div>
        )}
        <div className={styles.signup__FormGroup}>
          <input
            type="email"
            name="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-required="true"
            {...register("email", { required: true, pattern: '/[a-z0-9]+@[a-z]+.[a-z]{2,3}/' })}
          />
          <label htmlFor="lastName">Email</label>
        </div>
        {errors?.email && (
          <div className={styles.input__Error_Message}>
            <img src={ErrorIcon} alt="" />
            <span role="alert">
              {errors?.email?.type && "You must enter a valid email"}
            </span>
          </div>
        )}
        <div className={styles.signup__FormGroup}>
          <input
            type="password"
            name="password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-required="true"
            {...register("password", { required: true, 
              validate: CheckPasswordValidation })}
          />
          <label htmlFor="password">Password</label>
        </div>
        {errors?.password && (
          <div className={styles.input__Error_Message}>
            <img src={ErrorIcon} alt="" />
            <span role="alert">
              {errors?.password?.type && (errors?.password?.message || "You must enter a password")}
            </span>
          </div>
        )}
        <div className={styles.signup__FormGroup}>
          <input
            type="password"
            name="confirmPassword"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            aria-required="true"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => {
                if (watch("password") !== value) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        {errors?.confirmPassword && (
          <div className={styles.input__Error_Message}>
            <img src={ErrorIcon} alt="" />
            <span role="alert">
              {errors?.confirmPassword?.type &&
                (errors?.confirmPassword?.message ||
                  "You must enter a confirm password")}
            </span>
          </div>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

function LoginForm({ handleLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className={styles.signup__Container}>
      <div className={styles.signup__Content}>
        <h1>Login</h1>
        <p>Get access to your Orders, Wishlist and Recommendations.</p>
      </div>
      <form
        className={styles.signup__Form}
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className={styles.signup__FormGroup}>
          <input
            type="email"
            name="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-required="true"
            {...register("email", { required: true})}
          />
          <label htmlFor="lastName">Email</label>
        </div>
        <div className={styles.signup__FormGroup}>
          <input
            type="password"
            name="password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-required="true"
            {...register("password", { required: true})}
          />
          <label htmlFor="password">Password</label>
        </div>
        {(errors?.password || errors?.email) && (
          <div className={styles.input__Error_Message}>
            <img src={ErrorIcon} alt="" />
            <span role="alert">Invalid Username or Password</span>
          </div>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function SignUp({ page }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails, isUserLoggedIn } = useSelector((state) => state.users);

  const handleSubmit = (user) => {
    dispatch(signUp(user));
    navigate("/home");
  };
  const handleLogin = (user) => {
    const { email, password } = user;
    const tempUser = userDetails?.filter(
      (eachUser) => eachUser.email === email && eachUser.password === password
    );
    if (tempUser?.length > 0) {
      dispatch(login());
      navigate("/home");
      return;
    }
    
    return;
  };
  return isUserLoggedIn === true ? (
    <Navigate to="/home" replace />
  ) : (
    <>
      {page === "signup" && <SignUpForm handleFormSubmit={handleSubmit} />}
      {page === "login" && <LoginForm handleLogin={handleLogin} />}
    </>
  );
}

export default SignUp;
