import { useQuery } from "react-query";
import { TeamService } from "../../services/api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingSpinner from "../feedback/LoadingSpinner";
import List from "@mui/material/List";
import AssignmentItem from "./AssignmentItem";
import AddAssignmentForm from "./AddAssignmentForm";

export default function TeamAssignments() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(
    ["teamAssignments", id],
    () => TeamService.fetchTeamAssignments(id),
    { retry: false }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error?.response?.status === 404)
    return (
      <Layout id={id}>
        <Alert severity="warning">A equipe ainda não possui atribuições.</Alert>
      </Layout>
    );

  if (error && !error.response)
    return (
      <Layout id={id}>
        <Alert severity="error">
          Erro buscando os dados. Verifique sua conexão ou tente novamente mais
          tarde.
        </Alert>
      </Layout>
    );

  return (
    <Layout id={id}>
      <List>
        {data.map((assignment) => (
          <AssignmentItem key={assignment.id} id={id} assignment={assignment} />
        ))}
      </List>
    </Layout>
  );
}

function Layout({ children, id }) {
  const user = useSelector((state) => state.user.value);
  return (
    <Stack spacing={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Atribuições</Typography>
      </Box>

      {user.is_admin && <AddAssignmentForm />}

      {children}
    </Stack>
  );
}
