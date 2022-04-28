import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { TeamAssignmentService } from "../../services/api";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import useSnackbar from "../../hooks/useSnackbar";

const validationSchema = yup.object({
  description: yup
    .string()
    .required("Campo obrigatório.")
    .max(255, "Não deve possuir mais de 255 caracteres."),
});

export default function AddAssignmentForm() {
  const { displaySnackbar } = useSnackbar();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newAssignment) =>
      TeamAssignmentService.createAssignment({
        description: newAssignment,
        team_id: id,
      }),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries(["teamAssignments", id]);
        displaySnackbar({
          message: "Atribuição adicionada com sucesso.",
          severity: "success",
        });
      },
      onError: (_error, _variables) => {
        displaySnackbar({
          message:
            "Erro ao salvar a atribuição. Caso o erro persista, entre em contato com o administrador.",
          severity: "error",
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (data, { resetForm }) => {
      mutation.mutate(data.description);
      resetForm({ values: "" });
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" marginBottom={0.5} alignItems="center">
        <TextField
          multiline
          placeholder="Nova atribuição"
          sx={{ flex: 1 }}
          name="description"
          size="small"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.touched?.description && !!formik.errors.description}
          helperText={formik.touched?.description && formik.errors.description}
        />

        <Box marginLeft={1}>
          <LoadingButton
            loading={mutation.isLoading}
            type="submit"
            variant="outlined"
          >
            Salvar
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
}
