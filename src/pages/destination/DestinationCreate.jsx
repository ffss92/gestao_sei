import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CreateDestinationForm from "../../components/destination/CreateDestinationForm";

export default function DestinationCreate() {
  return (
    <Grid container>
      <Grid item marginY={4} xs={12}>
        <Container maxWidth="sm">
          <CreateDestinationForm />
        </Container>
      </Grid>
    </Grid>
  );
}
