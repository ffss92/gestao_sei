import { useSelector } from "react-redux";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import CreateTeamForm from "../../components/teams/CreateTeamForm";
import Collapse from "@mui/material/Collapse";
import TeamTable from "../../components/teams/TeamTable";

export default function Teams() {
  const user = useSelector((state) => state.user.value);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box>
      {
        // Dá aos administradores a opção de criar nova equipe
        user.is_admin && (
          <Box
            component={Toolbar}
            bgcolor="primary"
            display="flex"
            justifyContent="end"
          >
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleClick}
            >
              Equipe
            </Button>
          </Box>
        )
      }
      <Grid container marginTop={2}>
        <Grid item xs={12}>
          <Collapse in={isOpen}>
            <Container maxWidth="xs">
              <CreateTeamForm />
            </Container>
          </Collapse>
        </Grid>
        <Grid item xs={12} marginY={4}>
          <Container maxWidth="md">
            <TeamTable />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
