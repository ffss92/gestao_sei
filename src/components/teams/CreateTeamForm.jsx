import { useQueryClient, useMutation } from "react-query";
import { useState } from "react";
import { useFormik } from "formik";
import { TeamService } from "../../services/api";
import * as yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Campo obrigatório")
    .max(200, "Não deve possuir mais de 200 caracteres."),
});

export default function CreateTeamForm() {
  const { displaySnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation((newTeam) => TeamService.createTeam(newTeam), {
    onSuccess: (_, __) => {
      queryClient.invalidateQueries("teams");
      displaySnackbar({
        message: "Equipe criada com sucesso!",
        severity: "success",
      });
    },
    onError: (data, _) => {
      if (data.response?.status === 400) {
        displaySnackbar({
          message: "Não foi possível criar equipe. Nome em uso.",
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
    onSettled: (_data, _error, variables) => {
      setLoading(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      is_active: true,
    },
    onSubmit: (data) => {
      setLoading(true);
      mutation.mutate(data);
    },
    validationSchema,
  });

  return (
    <Stack spacing={1}>
      <Typography textAlign="center" marginBottom={2} variant="h4">
        Adicionar equipe
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={1}>
          <TextField
            label="Nome*"
            name="name"
            onChange={formik.handleChange}
            fullWidth
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
              checked={formik.values.is_active}
              onChange={formik.handleChange}
              name="is_active"
            />
          </Box>
          <LoadingButton
            loading={loading}
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
