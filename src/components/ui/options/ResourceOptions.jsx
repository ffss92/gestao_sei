import { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function ProcessOptions() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const open = !!anchorEl;
  // Menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      {/* Botão para mostrar menu de opções */}
      <Tooltip title="Opções">
        <IconButton
          sx={{
            position: "absolute",
            right: -16,
            top: -28,
          }}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      {/* Menu de Opções */}
      <Menu elevation={4} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Editar</MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenDialog();
            handleClose();
          }}
        >
          Excluir
        </MenuItem>
      </Menu>

      {/* Diálogo - Exclusão */}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Essa ação não pode ser desfeita. Considere fechar o processo ao
            invés de excluí-lo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Cancelar</Button>
          <Button color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
