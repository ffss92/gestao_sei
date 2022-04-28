import Grid from "@mui/material/Grid";
import PersonInfo from "../../components/people/PersonInfo";
import DetailContainer from "../../components/ui/DetailContainer";

export default function PersonDetail() {
  return (
    <Grid container padding={{ xs: 1, md: 2 }}>
      <Grid item xs={12} display="flex" marginY={4}>
        <DetailContainer>
          <PersonInfo />
        </DetailContainer>
      </Grid>
    </Grid>
  );
}
