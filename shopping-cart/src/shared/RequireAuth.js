import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { isUserLoggedIn } = useSelector((state) => state.users);
  if (isUserLoggedIn !== true) return <Navigate to="/login" replace />;
  return children;
}

export default RequireAuth;
