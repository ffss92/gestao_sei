import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CreateProcessForm from "../../components/processes/CreateProcessForm";

export default function ProcessCreate() {
  return (
    <Grid container padding={2}>
      <Grid item xs={12} marginTop={4}>
        <Container maxWidth="sm">
          <Typography marginBottom={4} variant="h3">
            Cadastrar processo
          </Typography>
          <CreateProcessForm />
        </Container>
      </Grid>
    </Grid>
  );
}
