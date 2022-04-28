import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CreatePersonForm from "../../components/people/CreatePersonForm";

export default function PersonCreate() {
  return (
    <Grid container>
      <Grid item xs={12} marginY={4}>
        <Container maxWidth="sm">
          <CreatePersonForm />
        </Container>
      </Grid>
    </Grid>
  );
}
