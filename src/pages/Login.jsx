import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LoginForm from "../components/login/LoginForm";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LoginFormHelper from "../components/login/LoginFormHelper";

export default function Login() {
  const user = useSelector((state) => state.user.value);
  if (user.logged_in) return <Navigate to="/" />;

  return (
    <Grid
      container
      bgcolor="primary.dark"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Typography
              textAlign="center"
              fontWeight="200"
              variant="h3"
              padding={4}
              marginBottom={2}
            >
              Protocolo SEI
            </Typography>
            <LoginForm />
            <LoginFormHelper />
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
}
