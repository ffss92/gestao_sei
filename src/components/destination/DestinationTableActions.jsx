import { useMutation, useQueryClient } from "react-query";
import { DestinationService } from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";

export default function DestinationTableActions({ destinationId }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deleteMutation = useMutation(
    (id) => DestinationService.deleteDestination(id),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries("destinations");
      },
      onSettled: (_data, _error, _variables) => {
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
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton
            onClick={() => navigate(`/destinos/${destinationId}/editar`)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Essa ação é irreversível! Considere editar o destino / origem ao
            invés de excluí-lo.
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <LoadingButton
              onClick={() => handleClick(destinationId)}
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
