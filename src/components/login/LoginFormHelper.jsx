import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function LoginFormHelper() {
  return (
    <Stack spacing={0.5} marginTop={4} alignItems="center">
      <Typography variant="caption">
        Não possui uma conta? <Link to="/register">Cadastre-se</Link>
      </Typography>
      <Typography variant="caption">
        <Link to="/forgot-password">Esqueceu sua senha?</Link>
      </Typography>
    </Stack>
  );
}
