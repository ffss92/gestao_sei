import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import UserProcessesList from "../../components/processes/UserProcessesList";

export default function Processes() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/processos/criar");
  };
  const handleSearchClick = () => {
    navigate("/processos/pesquisar");
  };
  const [currentTab, setCurrentTab] = useState(null);
  const handleChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          component={Toolbar}
          bgcolor="primary"
          display="flex"
          justifyContent="end"
        >
          <Button
            sx={{ marginRight: 1 }}
            startIcon={<SearchIcon />}
            onClick={handleSearchClick}
          >
            Pesquisar
          </Button>
          <Button
            onClick={handleClick}
            startIcon={<AddIcon />}
            variant="contained"
          >
            Criar
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} marginY={2}>
        <Container maxWidth="md">
          <Stack spacing={2}>
            <Typography variant="h5">Meus processos</Typography>
            <Box component={Paper} variant="outlined">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={currentTab}
                  textColor="secondary"
                  indicatorColor="secondary"
                  onChange={handleChange}
                >
                  <Tab value={null} label="Todos" />
                  <Tab value={"true"} label="Abertos" />
                  <Tab value={"false"} label="Fechados" />
                </Tabs>
              </Box>

              <UserProcessesList currentTab={currentTab} />
            </Box>
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
}
