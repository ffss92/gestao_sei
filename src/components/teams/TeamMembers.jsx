import { useQuery } from "react-query";
import { TeamService } from "../../services/api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import LoadingSpinner from "../feedback/LoadingSpinner";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddMemberForm from "./AddMemberForm";
import MemberItem from "./MemberItem";

export default function TeamMembers() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery(
    ["teamMembers", id],
    () => TeamService.fetchTeamMembers(id),
    { retry: false }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error?.response?.status === 404)
    return (
      <Layout>
        <Alert severity="warning">A equipe ainda não possui membros.</Alert>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <Alert severity="error">
          Erro buscando os dados. Verifique sua conexão ou tente novamente mais
          tarde.
        </Alert>
      </Layout>
    );

  return (
    <Layout>
      <List>
        {data.map((member) => (
          <MemberItem member={member} key={member.id} />
        ))}
      </List>
    </Layout>
  );
}

function Layout({ children }) {
  const user = useSelector((state) => state.user.value);
  return (
    <Stack spacing={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Membros</Typography>
      </Box>

      {user.is_admin && <AddMemberForm />}

      {children}
    </Stack>
  );
}
