import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { isUserLoggedIn } = useSelector((state) => state.users);
  return isUserLoggedIn === true ? children : <Navigate to="/login" replace/>;
}

export default RequireAuth;
