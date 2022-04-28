import EditPersonForm from "../../components/people/EditPersonForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { PersonService } from "../../services/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import { Alert } from "@mui/material";
import NotFound from "../NotFound";

export default function PersonEdit() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["person", id], () =>
    PersonService.fetchPerson(id)
  );

  if (isLoading) return <LoadingSpinner />;

  if (error?.response?.status === 404) return <NotFound />;

  if (error) return <Alert>Erro</Alert>;

  return (
    <Grid container>
      <Grid item xs={12} marginY={4}>
        <Container maxWidth="sm">
          <Stack spacing={2}>
            <Typography variant="h4">Editando Servidor</Typography>
            <EditPersonForm data={data} isLoading={isLoading} error={error} />
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
}
