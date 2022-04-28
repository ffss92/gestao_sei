import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import useRequireToken from "../hooks/useRequireToken";

export default function AdminRoute() {
  const user = useSelector((state) => state.user.value);
  const location = useLocation();

  // Verifica a presença de um accessToken a cada mudança de página
  useRequireToken();

  if (!user.logged_in && !user.is_admin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (user.logged_in && !user.is_admin) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
}
