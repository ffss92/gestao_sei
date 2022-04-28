import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function RegisterFormHelper() {
  return (
    <Stack spacing={0.5} marginTop={4} alignItems="center">
      <Typography variant="caption">
        Já possui uma conta? <Link to="/login">Entre</Link>
      </Typography>
      <Typography variant="caption">
        <Link to="/forgot-password">Esqueceu sua senha?</Link>
      </Typography>
    </Stack>
  );
}
