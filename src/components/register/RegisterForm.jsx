import { useFormik } from "formik";
import { useState } from "react";
import { createUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
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
    .required("Campo obrigatório")
    .min(8, "Senha deve conter pelo menos 8 caracteres"),
  repeatPassword: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password"), null], "Senhas devem ser idênticas"),
});

export default function RegisterForm() {
  const { displaySnackbar } = useSnackbar();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      // fullName: "",
      email: "",
      // phoneNumber: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await createUser(values);
        setLoading(false);
        displaySnackbar({
          message:
            "Usuário cadastrado com sucesso. Contate o administrador do sistema para ativação.",
          severity: "success",
        });
        setTimeout(() => navigate("/login"), 3500);
      } catch (err) {
        if (err.response?.status === 400) {
          displaySnackbar({
            message: "E-mail já cadastrado. Tente com um e-mail diferente.",
            severity: "error",
          });
        } else if (err.response?.status === 422) {
          displaySnackbar({
            message:
              "Erro de validação no formulário. Favor contactar o administrador do sistema.",
            severity: "error",
          });
        } else {
          displaySnackbar({
            message:
              "Erro de rede. Verifique sua conexão ou tente novamente mais tarde.",
            severity: "error",
          });
        }
        setLoading(false);
      }
    },
    validationSchema,
  });

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          value={formik.values.email}
          onChange={formik.handleChange}
          label="E-mail*"
          name="email"
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
        <TextField
          fullWidth
          name="repeatPassword"
          label="Repita sua senha*"
          value={formik.values.repeatPassword}
          error={
            formik.touched.repeatPassword && !!formik.errors.repeatPassword
          }
          onChange={formik.handleChange}
          type={passwordVisible ? "text" : "password"}
          helperText={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
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
          loading={loading}
          size="large"
          variant="contained"
          disableElevation
          type="submit"
        >
          Enviar
        </LoadingButton>
      </Stack>
    </form>
  );
}
