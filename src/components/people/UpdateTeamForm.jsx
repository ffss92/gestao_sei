import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { TeamService, PersonService } from "../../services/api";
import useSnackbar from "../../hooks/useSnackbar";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";

export default function UpdateTeamForm() {
  const { displaySnackbar } = useSnackbar();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (teamId) => PersonService.updatePerson(id, { team_id: teamId }),
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries("people");
        queryClient.invalidateQueries(["person", id]);
        queryClient.invalidateQueries(["teamMembers", variables]);
        displaySnackbar({
          message: "Equipe alterada com sucesso.",
          severity: "info",
        });
      },
      onSettled: (_data, _error) => {
        setLoading(false);
      },
    }
  );
  const [loading, setLoading] = useState(false);
  const { data, isLoading, error } = useQuery("teams", () =>
    TeamService.fetchTeams()
  );
  const formik = useFormik({
    initialValues: {
      team_id: "",
    },
    onSubmit: (data) => {
      const sanitazedData = { ...data };
      if (sanitazedData.team_id === "") sanitazedData.team_id = null;
      setLoading(true);
      mutation.mutate(sanitazedData.team_id);
    },
  });

  if (isLoading) return <Select defaultValue="" disabled />;

  if (error) return <Select defaultValue="" disabled />;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" marginBottom={2} alignItems="center">
        <FormControl size="small" fullWidth>
          <InputLabel>Equipe</InputLabel>
          <Select
            label="Equipe"
            name="team_id"
            size="small"
            value={formik.values.team_id}
            onChange={formik.handleChange}
          >
            <MenuItem value="">
              <em>Nenhuma</em>
            </MenuItem>
            {data.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box marginLeft={1}>
          <LoadingButton variant="outlined" loading={loading} type="submit">
            Salvar
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
}
