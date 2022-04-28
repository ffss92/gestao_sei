import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { TeamAssignmentService } from "../../services/api";
import { useFormik } from "formik";
import * as yup from "yup";
import ListItem from "@mui/material/ListItem";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = yup.object({
  description: yup.string().required("Campo obrigatório"),
});

export default function AssignmentItem({ assignment }) {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.value);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    (data) => TeamAssignmentService.updateAssignment(assignment.id, data),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries(["teamAssignments", id]);
      },
    }
  );
  const deleteMutation = useMutation(
    () => TeamAssignmentService.deleteAssignment(assignment.id),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries(["teamAssignments", id]);
      },
      onSettled: (_data, _error, _variables) => {
        setLoading(false);
      },
    }
  );

  const [editing, setEditing] = useState(false);
  const formik = useFormik({
    initialValues: {
      description: assignment.description,
    },
    validationSchema,
    onSubmit: (data) => {
      updateMutation.mutate(data);
      setEditing(false);
    },
  });
  const handleClick = () => {
    setLoading(true);
    deleteMutation.mutate(assignment.id);
  };
  const handleEditing = () => {
    setEditing((prev) => !prev);
    formik.resetForm({ values: { description: assignment.description } });
  };

  return editing ? (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" marginY={1} alignItems="start">
        <TextField
          fullWidth
          name="description"
          value={formik.values.description}
          size="small"
          onChange={formik.handleChange}
          error={formik.touched?.description && !!formik.errors.description}
          helperText={formik.touched?.description && formik.errors.description}
        />
        <Box display="flex">
          <IconButton type="submit">
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleEditing}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </form>
  ) : (
    <ListItem
      secondaryAction={
        user.is_admin && (
          <Tooltip title="Remover atribuição da equipe">
            <IconButton disabled={loading} onClick={handleClick}>
              {loading ? <CircularProgress size={18} /> : <ClearIcon />}
            </IconButton>
          </Tooltip>
        )
      }
      sx={{
        "&:hover": { background: grey[200] },
        marginY: 0.5,
        borderRadius: 2,
        transition: "background 250ms",
        background: grey[50],
      }}
    >
      <ListItemText
        sx={{ wordBreak: "break-all" }}
        primary={`${assignment.description}`}
      />
    </ListItem>
  );
}
