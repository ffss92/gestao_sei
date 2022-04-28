import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ProcessSearchResults from "../../components/processes/ProcessSearchResults";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ProcessSearchBar from "../../components/processes/ProcessSearchBar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function ProcessSearch() {
  const navigate = useNavigate();

  return (
    <Grid container p={1}>
      <Grid item xs={12}>
        <Container maxWidth="sm">
          <Stack spacing={1}>
            <Typography gutterBottom variant="h6">
              Nova pesquisa
            </Typography>
            <ProcessSearchBar />
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Button onClick={() => navigate("/processos/pesquisar")}>
                Ver Todos
              </Button>
              <Button
                color="info"
                variant="contained"
                onClick={() => navigate("/processos/pesquisa-avancada")}
              >
                Pesquisa Avançada
              </Button>
            </Box>
          </Stack>
        </Container>
      </Grid>
      <Grid item xs={12} marginY={2}>
        <ProcessSearchResults />
      </Grid>
    </Grid>
  );
}
