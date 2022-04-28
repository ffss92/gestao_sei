import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useQuery } from "react-query";
import { UserService } from "../../services/api";
import { Alert, CircularProgress } from "@mui/material";
import UserList from "./UserList";

export default function AdminUser() {
  const { data, isLoading, error } = useQuery("users", () =>
    UserService.fetchUsers()
  );

  if (isLoading) return <CircularProgress />;

  if (error) return <Alert severity="error">Erro!</Alert>;

  return (
    <Grid container>
      <Grid item xs={12} marginY={4}>
        <Container maxWidth="sm">
          <UserList users={data} />
        </Container>
      </Grid>
    </Grid>
  );
}
