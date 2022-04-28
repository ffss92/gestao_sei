import { useState } from "react";
import { authenticateUser, fetchCurrentUser } from "../../services/api";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import useSnackbar from "../../hooks/useSnackbar";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibleIcon from "@mui/icons-material/Visibility";
import VisibleOffIcon from "@mui/icons-material/VisibilityOff";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Formato de e-mail inválido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve contar pelo menos 8 caracteres")
    .required("Campo obrigatório"),
});

export default function LoginForm() {
  const { displaySnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const inTwoHours = Date.now() + 1000 * 60 * 60 * 2;
        const { access_token } = await authenticateUser(values);
        localStorage.setItem(
          "accessToken",
          JSON.stringify({ value: access_token, expires: inTwoHours })
        );
        const userData = await fetchCurrentUser(access_token);
        // Loga o usuário
        dispatch(signIn(userData));
        // Desloga o usuário em 1 hora e 55 minutos
        setTimeout(() => {
          dispatch(signOut());
          localStorage.removeItem("accessToken");
        }, 115 * 60 * 1000);
        setLoading(false);
        navigate("/", { replace: true });
      } catch (err) {
        if (err.response?.status === 400) {
          displaySnackbar({
            open: true,
            message: "E-mail ou senha inválidos. Tente novamente.",
            severity: "error",
          });
        } else if (err.response?.status === 422) {
          displaySnackbar({
            open: true,
            message:
              "Erro de validação no formulário. Favor contactar o administrador do sistema.",
            severity: "error",
          });
        } else if (err.response?.status === 401) {
          displaySnackbar({
            open: true,
            message:
              "Usuário inativo. Favor contactar o administrador do sistema para ativação.",
            severity: "warning",
          });
        } else {
          displaySnackbar({
            open: true,
            message:
              "Erro de rede. Verifique sua conexão ou tente novamente mais tarde.",
            severity: "error",
          });
        }
        setLoading(false);
      }
    },
  });

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          name="email"
          label="E-mail*"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          name="password"
          label="Senha*"
          value={formik.values.password}
          error={formik.touched.password && !!formik.errors.password}
          onChange={formik.handleChange}
          type={passwordVisible ? "text" : "password"}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {passwordVisible ? <VisibleOffIcon /> : <VisibleIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          disableElevation
          size="large"
          loading={loading}
        >
          Entrar
        </LoadingButton>
      </Stack>
    </form>
  );
}
