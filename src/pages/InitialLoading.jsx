import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export default function InitialLoading() {
  return (
    <Grid
      container
      minHeight="100vh"
      bgcolor={grey[900]}
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="info" />
    </Grid>
  );
}
