import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleClick = () => {
    navigate(from, { replace: true });
  };

  return (
    <Grid container flexGrow={1} justifyContent="center" alignItems="center">
      <Stack spacing={2}>
        <Typography variant="h3">Não há nada aqui...</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleClick}
          color="secondary"
          size="large"
        >
          Voltar
        </Button>
      </Stack>
    </Grid>
  );
}
