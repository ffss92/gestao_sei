import { useMutation, useQueryClient } from "react-query";
import { TeamService } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

export default function TeamTableActions({ team }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (teamId) => TeamService.deleteTeam(teamId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("teams");
        queryClient.invalidateQueries(["team", team.id]);
      },
      onSettled: () => {
        handleClose();
      },
    }
  );
  const handleClick = (id) => {
    deleteMutation.mutate(id);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <TableCell align="right">
      <Stack direction="row" justifyContent="end">
        <Tooltip title="Excluir">
          <IconButton disabled={deleteMutation.isLoading} onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton onClick={() => navigate(`/equipes/${team.id}/editar`)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Essa ação é irreversível! Considere editar a equipe e torná-la
            invativa ao invés de excluí-la.
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <LoadingButton
              onClick={() => handleClick(team.id)}
              loading={deleteMutation.isLoading}
              color="error"
              variant="contained"
              disableElevation
            >
              Excluir
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </TableCell>
  );
}
