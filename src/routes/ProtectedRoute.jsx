import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import Navigation from "../components/ui/Navigation";
import Box from "@mui/material/Box";
import useRequireToken from "../hooks/useRequireToken";

export default function ProtectedRoute() {
  const user = useSelector((state) => state.user.value);
  const location = useLocation();

  // Verifica a presença de um accessToken a cada mudança de página
  useRequireToken();

  if (!user.logged_in && !user.is_active) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Navigation />
      <Outlet />
    </Box>
  );
}
