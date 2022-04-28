import { useFormik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { ProcessUpdateService } from "../../services/api";
import useSnackbar from "../../hooks/useSnackbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";

const validationSchema = yup.object({
  description: yup
    .string()
    .required("Campo obrigatório.")
    .max(255, "Máximo de 255 caracteres."),
});

export default function ProcessUpdateCreate() {
  const { displaySnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { id: processId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) => ProcessUpdateService.createProcessUpdate(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["process", processId]);
      },
      onError: () => {
        displaySnackbar({
          message: "Erro criando a atualização.",
          severity: "error",
        });
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (data, { resetForm }) => {
      setLoading(true);
      mutation.mutate({ ...data, process_id: processId });
      resetForm({
        values: {
          description: "",
        },
      });
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" marginY={1} alignItems="center">
        <TextField
          fullWidth
          multiline
          name="description"
          label="Descrição"
          size="small"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <Box marginLeft={1}>
          <LoadingButton loading={loading} type="submit" variant="outlined">
            Salvar
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
}
