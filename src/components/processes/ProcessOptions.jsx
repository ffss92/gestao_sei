import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { ProcessService } from "../../services/api";
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
import FolderIcon from "@mui/icons-material/Folder";
import FolderOffIcon from "@mui/icons-material/FolderOff";

export default function ProcessOptions({ process }) {
  const { displaySnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const updateMutation = useMutation(
    () => ProcessService.editProcess(id, { is_active: !process.is_active }),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries("processes");
        queryClient.invalidateQueries(["process", id]);
        displaySnackbar({
          message: "Processo alterado com sucesso!",
          severity: "info",
        });
      },
      onError: (error, _variables) => {
        if (error.response?.status === 404) {
          displaySnackbar({
            message: "Recurso não existe mais. Redirecionando...",
            severity: "warning",
          });
          return setTimeout(() => navigate("/processos"), 250);
        } else if (error.response) {
          return displaySnackbar({
            message:
              "Erro ao atualizar o processo. Favor contactar o administrador do sistema",
            severity: "error",
          });
        }
        displaySnackbar({
          message:
            "Erro de rede. Verifique sua conexão ou tente novamente mais tarde.",
          severity: "error",
        });
      },
    }
  );
  const deleteMutation = useMutation(() => ProcessService.deleteProcess(id), {
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries("processes");
      queryClient.invalidateQueries(["process", id]);
      displaySnackbar({
        message: "Processo removido com sucesso!",
        severity: "info",
      });
      navigate("/processos");
    },
    onError: (error, _variables) => {
      if (error.response?.status === 404) {
        displaySnackbar({
          message: "Recurso não existe mais. Redirecionando...",
          severity: "warning",
        });
        return setTimeout(() => navigate("/processos"), 250);
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
            navigate(`/processos/${id}/editar`);
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
        {process.is_active ? (
          <MenuItem
            onClick={() => {
              updateMutation.mutate();
              handleClose();
            }}
          >
            <ListItemIcon>
              <FolderOffIcon />
            </ListItemIcon>
            <ListItemText>Fechar</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              updateMutation.mutate();
              handleClose();
            }}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText>Abrir</ListItemText>
          </MenuItem>
        )}
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
