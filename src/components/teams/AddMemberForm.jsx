import { useFormik } from "formik";
import { PersonService } from "../../services/api";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = yup.object({
  person_id: yup.number().required("Selecione um valor"),
});

export default function AddMemberForm() {
  const { displaySnackbar } = useSnackbar();
  const { id } = useParams();
  const { data, isLoading, error, isError } = useQuery("people", () =>
    PersonService.fetchPeople()
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (person_id) => PersonService.updatePerson(person_id, { team_id: id }),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries(["teamMembers", id]);
        queryClient.invalidateQueries("people");
        displaySnackbar({
          message: "Membro adicionado com sucesso.",
          severity: "success",
        });
      },
      onError: (error, _variables) => {
        displaySnackbar({
          message:
            "Erro ao adicionar membro. Verifique sua conexão ou tente novamente mais tarde.",
          severity: "error",
        });
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      person_id: "",
    },
    validationSchema,
    onSubmit: (formData, { resetForm }) => {
      resetForm({ values: "" });
      mutation.mutate(formData.person_id);
    },
  });

  if (error?.response?.status === 404)
    return (
      <Alert severity="info">
        Não há servidores disponíveis para serem alocados.
      </Alert>
    );

  if (error)
    return (
      <Alert severity="error">
        Erro recuperando as informações dos servidores. Verifique sua conexão ou
        tenta novamente mais tarde.
      </Alert>
    );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" alignItems="center">
        <FormControl size="small" fullWidth>
          <InputLabel
            error={formik.touched?.person_id && !!formik.errors.person_id}
          >
            Servidores
          </InputLabel>
          <Select
            size="small"
            name="person_id"
            disabled={isError}
            value={formik.values.person_id}
            label="Servidores"
            onChange={formik.handleChange}
            error={formik.touched?.person_id && !!formik.errors.person_id}
          >
            {!isLoading && data
              ? data.map((person) => (
                  <MenuItem key={person.id} value={person.id}>
                    {`${person.full_name} - ${
                      person.team?.name || "Sem equipe"
                    }`}
                  </MenuItem>
                ))
              : []}
          </Select>
        </FormControl>

        <Box marginLeft={1}>
          <LoadingButton
            variant="outlined"
            loading={mutation.isLoading}
            type="submit"
          >
            Salvar
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
}
