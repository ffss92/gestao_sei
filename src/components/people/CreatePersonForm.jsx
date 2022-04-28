import { useQuery, useQueryClient } from "react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { PersonService, TeamService } from "../../services/api";
import { useMutation } from "react-query";
import useSnackbar from "../../hooks/useSnackbar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";

const validationSchema = yup.object({
  full_name: yup.string().required("Campo obrigatório"),
  phone_number: yup
    .string()
    .matches(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Formato deve ser: '(99) 99999-9999' ou '(99) 9999-9999'"
    ),
  work_phone: yup.string().matches(/^\d{5}$/, "Formato deve ser: '99999'"),
  professional_email: yup
    .string()
    .required("Campo obrigatório")
    .email("Formato de e-mail inválido"),
});

export default function CreatePersonForm() {
  const { displaySnackbar } = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(
    "teams",
    () => TeamService.fetchTeams(),
    {
      retry: false,
    }
  );
  const mutation = useMutation((data) => PersonService.createPerson(data), {
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries("people");
      displaySnackbar({
        message: "Servidor adicionado com sucesso!",
        severity: "success",
      });
      navigate("/servidores");
    },
    onError: (error, _variables) => {
      if (error.response?.status === 400) {
        displaySnackbar({
          message: "E-mail já cadastrado.",
          severity: "error",
        });
      } else {
        displaySnackbar({
          message:
            "Erro ao cadastrar o servidor. Verifique sua conexão ou tente novamente mais tarde.",
          severity: "error",
        });
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      full_name: "",
      phone_number: "",
      work_phone: "",
      professional_email: "",
      team_id: "",
    },
    validationSchema,
    onSubmit: (data) => {
      const sanitazedData = { ...data };
      if (sanitazedData.team_id === "") sanitazedData.team_id = null;
      if (sanitazedData.phone_number === "") sanitazedData.phone_number = null;
      if (sanitazedData.work_phone === "") sanitazedData.work_phone = null;
      mutation.mutate(sanitazedData);
    },
  });

  let component;

  if (isLoading) component = <Select defaultValue="" disabled />;

  if (error) component = <Select defaultValue="" disabled />;

  if (data)
    component = (
      <FormControl>
        <InputLabel error={formik.touched?.team_id && !!formik.errors.team_id}>
          Equipe
        </InputLabel>
        <Select
          label="Equipe"
          name="team_id"
          onChange={formik.handleChange}
          value={formik.values.team_id}
        >
          <MenuItem value="">
            <em>Nenhuma</em>
          </MenuItem>
          {data.map((team) => (
            <MenuItem value={team.id} key={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched?.team_id && formik.errors.team_id}
        </FormHelperText>
      </FormControl>
    );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Cadastrar Servidor
        </Typography>

        <TextField
          name="full_name"
          value={formik.values.full_name}
          onChange={formik.handleChange}
          label="Nome Completo*"
          error={formik.touched?.full_name && !!formik.errors.full_name}
          helperText={formik.touched?.full_name && formik.errors.full_name}
          fullWidth
        />

        <TextField
          name="phone_number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          label="Número de Telefone"
          placeholder="(99) 99999-9999"
          error={formik.touched?.phone_number && !!formik.errors.phone_number}
          helperText={
            formik.touched?.phone_number && formik.errors.phone_number
          }
          fullWidth
        />

        <TextField
          name="work_phone"
          value={formik.values.work_phone}
          onChange={formik.handleChange}
          label="Ramal"
          placeholder="99999"
          error={formik.touched?.work_phone && !!formik.errors.work_phone}
          helperText={formik.touched?.work_phone && formik.errors.work_phone}
          fullWidth
        />

        <TextField
          label="E-mail institucional*"
          fullWidth
          name="professional_email"
          value={formik.values.professional_email}
          onChange={formik.handleChange}
          error={
            formik.touched?.professional_email &&
            !!formik.errors.professional_email
          }
          helperText={
            formik.touched?.professional_email &&
            formik.errors.professional_email
          }
        />

        {component}

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
  );
}
