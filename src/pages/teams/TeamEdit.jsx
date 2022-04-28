import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TeamService } from "../../services/api";
import Grid from "@mui/material/Grid";
import NotFound from "../NotFound";
import Container from "@mui/material/Container";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import EditTeamForm from "../../components/teams/EditTeamForm";

export default function TeamEdit() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["team", id], () =>
    TeamService.fetchTeamDetail(id)
  );

  if (error) return <NotFound />;

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

  return (
    <Grid container>
      <Grid item xs={12} marginY={4}>
        <Container maxWidth="sm">
          <EditTeamForm data={data} />
        </Container>
      </Grid>
    </Grid>
  );
}
