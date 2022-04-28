import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../features/userSlice";
import { toggleDrawer } from "../../features/drawerSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import StyledLink from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DrawerContent from "./DrawerContent";

export default function Navigation() {
  const location = useLocation();
  const drawerOpen = useSelector((state) => state.drawer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOutClick = () => {
    handleClose();
    dispatch(signOut());
    localStorage.removeItem("accessToken");
    navigate("/login", { state: { from: location } });
  };
  const handleAccountClick = () => {
    handleClose();
    navigate("/conta", { state: { from: location } });
  };

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton color="inherit" size="large" onClick={handleToggleDrawer}>
            <MenuIcon />
          </IconButton>
          <StyledLink
            underline="none"
            component="div"
            color="inherit"
            marginLeft={1}
            variant="h6"
            flexGrow={1}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Protocolo SEI
            </Link>
          </StyledLink>
          <IconButton color="inherit" size="large" onClick={handleClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            elevation={3}
          >
            <MenuItem onClick={handleAccountClick}>Minha conta</MenuItem>
            <MenuItem onClick={handleSignOutClick}>
              <Typography color="error">Sair</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        elevation={6}
        open={drawerOpen}
        onClose={handleToggleDrawer}
        anchor="left"
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
}
