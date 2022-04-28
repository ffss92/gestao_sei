import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { DestinationService } from "../../services/api";
import { useParams } from "react-router-dom";
import useSnackbar from "../../hooks/useSnackbar";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Campo obrigatório.")
    .max(255, "Deve conter menos de 255 caracteres."),
  short_name: yup.string().max(50, "Deve conter menos de 50 caracteres."),
});

export default function EditDestinationForm({ data }) {
  const { displaySnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) => DestinationService.updateDestination(id, data),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries("destinations");
        queryClient.invalidateQueries(["destination", id]);
        displaySnackbar({
          message: "Destino editado com successo!",
          severity: "success",
        });
        navigate("/destinos");
      },
      onError: (error, _variables) => {
        if (error.response?.status === 400) {
          return displaySnackbar({
            message: "Nome em uso.",
            severity: "error",
          });
        } else if (error.response?.status === 422) {
          return displaySnackbar({
            message:
              "Erro de validação do formulário. Contate o administrador do sistema.",
            severity: "error",
          });
        } else if (error.response?.status === 500) {
          return displaySnackbar({
            message:
              "Erro interno do servidor. Contate o administrador do sistema.",
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
  const formik = useFormik({
    initialValues: {
      name: data.name,
      short_name: data.short_name,
    },
    onSubmit: (data) => {
      mutation.mutate(data);
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Typography textAlign="center" variant="h4" gutterBottom>
          Editar Origem/Destino
        </Typography>
        <TextField
          fullWidth
          error={formik.touched?.name && !!formik.errors.name}
          helperText={formik.touched?.name && formik.errors.name}
          label="Nome*"
          onChange={formik.handleChange}
          name="name"
          value={formik.values.name}
        />
        <TextField
          fullWidth
          error={formik.touched?.short_name && !!formik.errors.short_name}
          helperText={formik.touched?.short_name && formik.errors.short_name}
          label="Sigla"
          onChange={formik.handleChange}
          name="short_name"
          value={formik.values.short_name}
        />
        <LoadingButton
          variant="contained"
          disableElevation
          type="submit"
          loading={mutation.isLoading}
        >
          Salvar
        </LoadingButton>
      </Stack>
    </form>
  );
}
