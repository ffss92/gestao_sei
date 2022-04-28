import { useLocation, useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function DrawerItem({ icon, title, path }) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path, { state: { from: location } });
  };
  return (
    <ListItemButton
      sx={{
        borderRadius: 2,
        marginX: 1,
        marginY: 0.5,
      }}
      selected={location.pathname === path}
      onClick={handleClick}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}
