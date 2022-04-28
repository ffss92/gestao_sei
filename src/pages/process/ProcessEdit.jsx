import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ProcessService } from "../../services/api";
import NotFound from "../NotFound";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import EditProcessForm from "../../components/processes/EditProcessForm";
import Typography from "@mui/material/Typography";

export default function ProcessEdit() {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery(["process", id], () =>
    ProcessService.fetchProcess(id)
  );

  if (isLoading)
    return (
      <Grid container>
        <Grid item xs={12} marginY={4}>
          <Container>
            <LoadingSpinner />
          </Container>
        </Grid>
      </Grid>
    );

  if (error?.response?.status === 404) return <NotFound />;

  return (
    <Grid container>
      <Grid item xs={12} marginY={4}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Editar processo
          </Typography>
          <EditProcessForm data={data} />
        </Container>
      </Grid>
    </Grid>
  );
}
