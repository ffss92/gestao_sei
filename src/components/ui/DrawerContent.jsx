import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../features/drawerSlice";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import Divider from "@mui/material/Divider";
import DrawerItem from "./DrawerItem";
import KeyIcon from "@mui/icons-material/Key";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

export default function DrawerContent() {
  const dispatch = useDispatch();
  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };
  const user = useSelector((state) => state.user.value);

  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleToggleDrawer}
      onKeyDown={handleToggleDrawer}
    >
      <List dense component="nav">
        <ListSubheader>Páginas</ListSubheader>
        <DrawerItem icon={<HomeIcon />} title="Início" path="/" />
        <DrawerItem icon={<AccountCircleIcon />} title="Conta" path="/conta" />

        <Divider />

        <ListSubheader>Protocolo</ListSubheader>
        <DrawerItem icon={<FolderIcon />} title="Processos" path="/processos" />
        <DrawerItem
          icon={<SearchIcon />}
          title="Pesquisar processos"
          path="/processos/pesquisar"
        />
        <DrawerItem
          icon={<PersonIcon />}
          title="Servidores"
          path="/servidores"
        />
        <DrawerItem icon={<GroupsIcon />} title="Equipes" path="/equipes" />
        <DrawerItem
          icon={<BusinessIcon />}
          title="Origens / Destinos"
          path="/destinos"
        />

        <Divider />

        {user.is_admin && (
          <>
            <ListSubheader>Admin</ListSubheader>
            <DrawerItem
              icon={<KeyIcon />}
              title="Usuários"
              path="/admin/users"
            />
          </>
        )}
      </List>
    </Box>
  );
}
