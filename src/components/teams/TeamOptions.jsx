import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { TeamService } from "../../services/api";
import useSnackbar from "../../hooks/useSnackbar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function TeamOptions() {
  const { displaySnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteMutation = useMutation(() => TeamService.deleteTeam(id), {
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries("teams");
      queryClient.invalidateQueries(["team", id]);
      navigate("/equipes");
    },
    onError: (error, _variables) => {
      if (error.response?.status === 404) {
        displaySnackbar({
          message: "Recurso não existe mais. Redirecionando...",
          severity: "warning",
        });
        return setTimeout(() => navigate("/equipes"), 250);
      } else if (error.response) {
        return displaySnackbar({
          message:
            "Erro ao deletar servidor. Favor contactar o administrador do sistema",
          severity: "error",
        });
      }
      displaySnackbar({
        message:
          "Erro de rede. Verifique sua conexão ou tente novamente mais tarde.",
        severity: "error",
      });
    },
  });
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
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/equipes/${id}/editar`);
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOpenDialog();
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>

      {/* Diálogo - Exclusão */}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Essa ação não pode ser desfeita. Considere tornar a equipe inativa
            ao invés de excluí-la.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            color="error"
            onClick={() => {
              deleteMutation.mutate();
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
