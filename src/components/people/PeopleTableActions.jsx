import { useQueryClient, useMutation } from "react-query";
import { PersonService } from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";

export default function PeopleTableActions({ personId }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation((id) => PersonService.deletePerson(id), {
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries("people");
    },
    onSettled: () => {
      handleClose();
    },
  });
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
          <IconButton
            onClick={() => navigate(`/servidores/${personId}/editar`)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Essa ação é irreversível! Considere editar o servidor e torná-lo
            inativo ao invés de excluí-lo.
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <LoadingButton
              onClick={() => handleClick(personId)}
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
