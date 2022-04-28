import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LastestProcesses from "../components/processes/LastestProcesses";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ProcessSearchBar from "../components/processes/ProcessSearchBar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Grid container padding={2}>
      <Grid item xs={12} marginTop={4}>
        <Container maxWidth="md">
          <Stack spacing={6}>
            <Typography variant="h3">Bem-vindo(a)</Typography>
            <Stack spacing={2}>
              <Typography variant="h5">Pesquisar processos</Typography>
              <ProcessSearchBar />
              <Stack direction="row" spacing={1} marginTop={1}>
                <Button
                  variant="contained"
                  onClick={() => navigate("/processos")}
                >
                  Meus processos
                </Button>
                <Button onClick={() => navigate("/processos/pesquisar")}>
                  Ver todos
                </Button>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h5">
                Últimos processos cadastrados
              </Typography>
              <LastestProcesses />
            </Stack>
          </Stack>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md"></Container>
      </Grid>
    </Grid>
  );
}
