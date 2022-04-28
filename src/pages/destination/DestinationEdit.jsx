import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import EditDestinationForm from "../../components/destination/EditDestinationForm";
import { DestinationService } from "../../services/api";

export default function DestinationEdit() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["destination", id], () =>
    DestinationService.fetchDestination(id)
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) return <NotFound />;

  return (
    <Grid container>
      <Grid item xs={12} marginY={4}>
        <Container maxWidth="sm">
          <EditDestinationForm data={data} />
        </Container>
      </Grid>
    </Grid>
  );
}
