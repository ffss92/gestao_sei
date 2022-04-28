import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PersonService, TeamService } from "../../services/api";
import * as yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const validationSchema = yup.object({
  full_name: yup.string().required("Campo obrigatório"),
  phone_number: yup
    .string()
    .nullable()
    .matches(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Formato deve ser: '(99) 99999-9999' ou '(99) 9999-9999'"
    ),
  work_phone: yup.string().matches(/^\d{5}$/, "Formato deve ser: '99999'"),
  professional_email: yup
    .string()
    .required("Campo obrigatório")
    .email("Formato de e-mail deve ser válido"),
});

export default function EditPersonForm({ data }) {
  const { displaySnackbar } = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const editMutation = useMutation(
    (data) => PersonService.updatePerson(id, data),
    {
      onSuccess: (data, variables) => {
        displaySnackbar({
          message: "Servidor editado com sucesso!",
          severity: "info",
        });
        queryClient.invalidateQueries(["person", id]);
        queryClient.invalidateQueries("people");
        navigate(`/servidores/${id}`);
      },
      onError: (error, variables) => {
        if (error.response?.status === 400) {
          return displaySnackbar({
            message: "E-mail em uso!",
            severity: "error",
          });
        }
        if (error.response?.status === 422) {
          return displaySnackbar({
            message:
              "Erro de validação no formulário. Contate o administrador do sistema",
            severity: "warning",
          });
        }
        displaySnackbar({
          message:
            "Erro editando o servidor. Verifique sua conexão ou tente novamente mais tarde.",
          severity: "error",
        });
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      full_name: data.full_name,
      professional_email: data.professional_email,
      phone_number: data.phone_number || "",
      team_id: data.team?.id || "",
      work_phone: data.work_phone || "",
    },
    onSubmit: (formData) => {
      const sanitazedData = { ...formData };
      if (sanitazedData.team_id === "") sanitazedData.team_id = null;
      if (sanitazedData.phone_number === "") sanitazedData.phone_number = null;
      if (sanitazedData.work_phone === "") sanitazedData.work_phone = null;
      if (sanitazedData.team_id === "") sanitazedData.team_id = null;
      editMutation.mutate(sanitazedData);
    },
    validationSchema,
  });
  const {
    data: teamData,
    isLoading: teamIsLoading,
    error: teamError,
  } = useQuery("teams", () => TeamService.fetchTeams());

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Nome completo"
          name="full_name"
          value={formik.values.full_name}
          error={formik.touched?.full_name && !!formik.errors.full_name}
          helperText={formik.touched?.full_name && formik.errors.full_name}
          onChange={formik.handleChange}
        />
        <TextField
          label="Telefone"
          name="phone_number"
          value={formik.values.phone_number}
          error={formik.touched?.phone_number && !!formik.errors.phone_number}
          helperText={
            formik.touched?.phone_number && formik.errors.phone_number
          }
          onChange={formik.handleChange}
        />
        <TextField
          label="Ramal"
          name="work_phone"
          value={formik.values.work_phone}
          error={formik.touched?.work_phone && !!formik.errors.work_phone}
          helperText={formik.touched?.work_phone && formik.errors.work_phone}
          onChange={formik.handleChange}
        />
        <TextField
          label="E-mail institucional"
          name="professional_email"
          value={formik.values.professional_email}
          error={
            formik.touched?.professional_email &&
            !!formik.errors.professional_email
          }
          helperText={
            formik.touched?.professional_email &&
            formik.errors.professional_email
          }
          onChange={formik.handleChange}
        />
        <FormControl disabled={teamError || teamIsLoading}>
          <InputLabel>Equipe</InputLabel>
          <Select
            defaultValue={data.team?.id || ""}
            disabled={teamError || teamIsLoading}
            label="Equipe"
            name="team_id"
            value={formik.values.team_id}
            onChange={formik.handleChange}
            error={formik.touched?.team_id && !!formik.errors.team_id}
            MenuProps={MenuProps}
          >
            <MenuItem value="">Nenhum</MenuItem>
            {teamData &&
              teamData.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </Stack>
    </form>
  );
}
