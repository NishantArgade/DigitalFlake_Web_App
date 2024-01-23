import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuth,
  redirect = "/login",
  adminRoute,
  isAdmin,
  redirectAdmin = "/",
}) => {
  if (!isAuth) return <Navigate to={redirect} />;
  if (adminRoute && !isAdmin) return <Navigate to={redirectAdmin} />;

  return <Outlet />;
};

export default ProtectedRoute;
