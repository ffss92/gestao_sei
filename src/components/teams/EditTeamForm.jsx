import { useQueryClient, useMutation } from "react-query";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { TeamService } from "../../services/api";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import useSnackbar from "../../hooks/useSnackbar";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Campo obrigatório")
    .max(200, "Não deve possuir mais de 200 caracteres."),
});

export default function EditTeamForm({ data }) {
  const { displaySnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newTeam) => TeamService.updateTeam(id, newTeam),
    {
      onSuccess: (_, __) => {
        queryClient.invalidateQueries("teams");
        queryClient.invalidateQueries(["team", id]);
        displaySnackbar({
          message: "Equipe editada com sucesso!",
          severity: "success",
        });
        navigate(`/equipes/${id}`);
      },
      onError: (data, _) => {
        if (data.response?.status === 400) {
          displaySnackbar({
            message: "Não foi possível editar equipe. Nome em uso.",
            severity: "error",
          });
        } else if (data.response?.status === 422) {
          displaySnackbar({
            message:
              "Erro de validação no formulário. Favor contactar o administrador.",
            severity: "error",
          });
        } else {
          displaySnackbar({
            message:
              "Erro de rede. Verifique sua conexão ou tente novamente mais tarde.",
            severity: "error",
          });
        }
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: data.name,
      is_active: data.is_active,
    },
    onSubmit: (data) => {
      mutation.mutate(data);
    },
    validationSchema,
  });

  return (
    <Stack spacing={1}>
      <Typography marginBottom={1} variant="h4">
        Editar equipe
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={1}>
          <TextField
            label="Nome*"
            name="name"
            onChange={formik.handleChange}
            fullWidth
            value={formik.values.name}
            error={formik.touched?.name && !!formik.errors.name}
            helperText={formik.touched?.name && formik.errors.name}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>Ativa?</Typography>
            <Switch
              value={formik.values.is_active}
              checked={formik.values.is_active}
              onChange={formik.handleChange}
              name="is_active"
            />
          </Box>
          <LoadingButton
            loading={mutation.isLoading}
            type="submit"
            variant="contained"
            disableElevation
          >
            Salvar
          </LoadingButton>
        </Stack>
      </form>
    </Stack>
  );
}
