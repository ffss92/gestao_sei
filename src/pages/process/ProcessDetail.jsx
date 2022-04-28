import { useQuery } from "react-query";
import { ProcessService } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ProcessInfo from "../../components/processes/ProcessInfo";
import NotFound from "../NotFound";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

export default function ProcessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery(
    ["process", id],
    () => ProcessService.fetchProcess(id),
    {
      retry: false,
    }
  );

  if (isLoading)
    return (
      <Grid container flexGrow={1} justifyContent="center" alignItems="center">
        <LoadingSpinner />
      </Grid>
    );

  if (error?.response?.status === 404) return <NotFound />;

  if (error?.response?.status === 422)
    return (
      <Grid container>
        <Grid item xs={12} marginY={4}>
          <Container maxWidth="sm">
            <Alert
              severity="error"
              action={
                <Button
                  size="small"
                  color="error"
                  onClick={() => navigate("/processos")}
                >
                  Voltar
                </Button>
              }
            >
              Formato de ID inválido.
            </Alert>
          </Container>
        </Grid>
      </Grid>
    );

  return (
    <Grid container>
      <Grid item p={1} marginY={2} xs={12}>
        <ProcessInfo data={data} />
      </Grid>
    </Grid>
  );
}
