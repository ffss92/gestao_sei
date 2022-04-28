import { grey } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient, useMutation } from "react-query";
import { ProcessUpdateService } from "../../services/api";
import useSnackbar from "../../hooks/useSnackbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";

export default function ProcessUpdateItem({ update }) {
  const { displaySnackbar } = useSnackbar();
  const { id: processId } = useParams();
  const user = useSelector((state) => state.user.value);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (id) => ProcessUpdateService.deleteProcessUpdate(id),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries(["process", processId]);
      },
      onError: (_error, _variables) => {
        displaySnackbar({
          message: "Erro ao remover atualização",
          severity: "error",
        });
      },
    }
  );

  return (
    <Box
      sx={{
        "&:hover": { background: grey[100] },
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
        transition: "background 250ms",
        background: grey[50],
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Typography component="div" fontWeight={500} variant="caption" flex={1}>
          {update.user.email}
        </Typography>
        <Typography
          display={{ xs: "none", sm: "flex" }}
          marginRight={1}
          component="div"
          variant="caption"
        >
          <em>{new Date(update.created_at).toLocaleString()}</em>
        </Typography>
        {user.id === update.user.id && (
          <IconButton
            disabled={deleteMutation.isLoading}
            onClick={() => deleteMutation.mutate(update.id)}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>
      <Typography variant="body2">{update.description}</Typography>
    </Box>
  );
}
