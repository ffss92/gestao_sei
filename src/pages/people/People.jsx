import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import PeopleTable from "../../components/people/PeopleTable";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function Staff() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  return (
    <Grid container>
      {user.is_admin && (
        <Grid item xs={12}>
          <Box
            component={Toolbar}
            bgcolor="primary"
            display="flex"
            justifyContent="end"
          >
            <Button
              onClick={() => navigate("/servidores/criar")}
              startIcon={<AddIcon />}
              variant="contained"
            >
              Servidor
            </Button>
          </Box>
        </Grid>
      )}

      <Grid item xs={12} marginY={4} marginX={{ sm: 2, md: 4, lg: 8 }}>
        <Container>
          <PeopleTable />
        </Container>
      </Grid>
    </Grid>
  );
}
