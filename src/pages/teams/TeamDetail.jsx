import Grid from "@mui/material/Grid";
import TeamMembers from "../../components/teams/TeamMembers";
import TeamAssignments from "../../components/teams/TeamAssignments";
import TeamInfo from "../../components/teams/TeamInfo";
import SectionDivider from "../../components/ui/SectionDivider";
import DetailContainer from "../../components/ui/DetailContainer";

export default function TeamDetail() {
  return (
    <Grid container padding={{ xs: 1, md: 2 }}>
      <Grid item xs={12} display="flex" marginY={4}>
        <DetailContainer>
          <Grid container>
            <Grid item xs={12}>
              <TeamInfo />
            </Grid>
            <SectionDivider />
            <Grid item xs={12}>
              <TeamMembers />
            </Grid>
            <SectionDivider />
            <Grid item xs={12}>
              <TeamAssignments />
            </Grid>
          </Grid>
        </DetailContainer>
      </Grid>
    </Grid>
  );
}
