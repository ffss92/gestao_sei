import { useSelector } from "react-redux";
import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { UserService } from "../services/api";
import useSnackbar from "../hooks/useSnackbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as yup from "yup";

const validationSchema = yup.object({
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres")
    .max(150, "Máximo de 150 caracteres"),
  newPassword: yup
    .string()
    .required("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres")
    .max(150, "Máximo de 150 caracteres"),
  repeatNewPassword: yup
    .string()
    .required("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres")
    .max(150, "Máximo de 150 caracteres")
    .oneOf([yup.ref("newPassword"), null], "Senhas devem ser idênticas"),
});

export default function Account() {
  const { displaySnackbar } = useSnackbar();
  const mutation = useMutation((data) => UserService.changePassword(data), {
    onSuccess: (_data, _variables) => {
      displaySnackbar({
        message: "Senha alterada com sucesso",
        severity: "info",
      });
      handleClose();
    },
    onError: (error, _variables) => {
      if (error.response?.status === 400) {
        return displaySnackbar({
          message: "Senha informada é inválida",
          severity: "error",
        });
      }
      displaySnackbar({
        message:
          "Não foi possível alterar sua senha. Verifique sua conexão ou tente novamente mais tarde.",
        severity: "error",
      });
    },
  });
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.value);
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    onSubmit: (data) => {
      mutation.mutate({
        password: data.password,
        new_password: data.newPassword,
      });
    },
    validationSchema,
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm({ values: "" });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Grid container padding={1}>
      <Grid item xs={12} marginTop={4}>
        <Container component={Paper} maxWidth="sm">
          <Stack spacing={1} paddingY={2}>
            <Typography variant="h4" color="primary">
              Informações de usuário
            </Typography>

            <Divider />

            <Typography gutterBottom>Email: {user.email}</Typography>
            <Typography gutterBottom>
              Status: {user.is_active ? "Ativo" : "Inativo"}
            </Typography>
          </Stack>
          <Stack direction="row" paddingY={1} justifyContent="end" spacing={1}>
            <Button variant="contained" onClick={handleOpen}>
              Alterar senha
            </Button>
            <Button color="error">Desativar</Button>
          </Stack>
        </Container>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Altere sua senha</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Para alterar sua senha, informe sua senha antiga. Então, escolha
              uma nova senha e repita.
            </DialogContentText>

            <Stack spacing={1} marginTop={1}>
              <TextField
                label="Senha Atual"
                fullWidth
                variant="standard"
                error={formik.touched?.password && !!formik.errors.password}
                helperText={formik.touched?.password && formik.errors.password}
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <TextField
                label="Nova senha"
                fullWidth
                error={
                  formik.touched?.newPassword && !!formik.errors.newPassword
                }
                helperText={
                  formik.touched?.newPassword && formik.errors.newPassword
                }
                variant="standard"
                type="password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
              />
              <TextField
                label="Repita nova senha"
                fullWidth
                error={
                  formik.touched?.repeatNewPassword &&
                  !!formik.errors.repeatNewPassword
                }
                helperText={
                  formik.touched?.repeatNewPassword &&
                  formik.errors.repeatNewPassword
                }
                type="password"
                variant="standard"
                name="repeatNewPassword"
                value={formik.values.repeatNewPassword}
                onChange={formik.handleChange}
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" type="submit">
              Alterar
            </Button>

            <Button onClick={handleClose} color="error">
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
}
