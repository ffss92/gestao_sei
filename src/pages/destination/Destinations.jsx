import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import DestionationTable from "../../components/destination/DestinationTable";

export default function Destinations() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const handleClick = () => {
    navigate("/destinos/criar");
  };

  return (
    <Grid container>
      {user.is_admin && (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="end" component={Toolbar}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleClick}
            >
              Novo
            </Button>
          </Box>
        </Grid>
      )}

      <Grid item xs={12} marginY={2}>
        <Container maxWidth="md">
          <DestionationTable />
        </Container>
      </Grid>
    </Grid>
  );
}
