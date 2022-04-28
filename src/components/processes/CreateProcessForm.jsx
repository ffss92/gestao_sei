import { useFormik } from "formik";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ProcessService } from "../../services/api";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import DatePicker from "@mui/lab/DatePicker";
import * as yup from "yup";
import DestinationsSelect from "../forms/DestinationsSelect";
import OriginSelect from "../forms/OriginSelect";
import PersonSelect from "../forms/PersonSelect";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import useSnackbar from "../../hooks/useSnackbar";

const validationSchema = yup.object({
  number: yup
    .string()
    .required("Campo obrigatório.")
    .matches(
      /^\d{4}.\d{2}.\d{7}\/\d{4}-\d{2}$/,
      "Formato inválido. 9999.99.9999999/9999-99"
    ),
  is_active: yup.boolean().required("Campo obrigatório"),
  is_generated: yup.boolean().required("Campo obrigatório."),
  subject: yup
    .string()
    .required("Campo obrigatório.")
    .max(255, "Máximo de 255 caracteres."),
  description: yup.string().max(600, "Máximo de 600 caracteres."),
  person_id: yup.number(),
  destination_ids: yup.array(),
  origin_id: yup.number(),
});

export default function CreateProcessForm() {
  const { displaySnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [destinations, setDestinations] = useState([]);
  const [isDue, setIsDue] = useState(false);
  const mutation = useMutation((data) => ProcessService.createProcess(data), {
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries("processes");
      displaySnackbar({
        message: "Processo criado com sucesso!",
        severity: "success",
      });
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        displaySnackbar({
          message: "Número de processo já cadastrado",
          severity: "error",
        });
      } else if (error.response?.status === 404) {
        displaySnackbar({
          message: "Um dos recursos informados não existe mais",
          severity: "error",
        });
      } else if (error.response?.status === 500) {
        displaySnackbar({
          message:
            "Erro cadastrando o processo. Contate o administrador do sistema.",
          severity: "error",
        });
      } else {
        displaySnackbar({
          message:
            "Erro de rede. Verifique sua conexão ou tente novamente mais tarde.",
          severity: "error",
        });
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      number: "",
      is_active: true,
      is_generated: false,
      subject: "",
      description: "",
      person_id: "",
      origin_id: "",
      due_to: new Date(),
      destination_ids: [],
    },
    onSubmit: (data) => {
      const sanitaziedData = { ...data };
      if (sanitaziedData.origin_id === "") sanitaziedData.origin_id = null;
      if (sanitaziedData.person_id === "") sanitaziedData.person_id = null;
      if (sanitaziedData.destination_ids === "")
        sanitaziedData.destination_ids = null;
      if (!isDue) sanitaziedData.due_to = null;
      if (destinations.length !== 0) {
        sanitaziedData.destination_ids = destinations;
      } else {
        sanitaziedData.destination_ids = null;
      }
      mutation.mutate(sanitaziedData);
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={1.5}>
        <TextField
          label="Número de Processo*"
          onChange={formik.handleChange}
          value={formik.values.number}
          name="number"
          error={formik.touched?.number && !!formik.errors.number}
          helperText={formik.touched?.number && formik.errors.number}
        />
        <TextField
          label="Assunto*"
          onChange={formik.handleChange}
          value={formik.values.subject}
          name="subject"
          error={formik.touched?.subject && !!formik.errors.subject}
          helperText={formik.touched?.subject && formik.errors.subject}
        />
        <TextField
          label="Descrição"
          multiline
          onChange={formik.handleChange}
          value={formik.values.description}
          name="description"
          error={formik.touched?.description && !!formik.errors.description}
          helperText={formik.touched?.description && formik.errors.description}
        />

        <PersonSelect formHandler={formik} />

        <OriginSelect formHandler={formik} />

        <DestinationsSelect setValues={setDestinations} />

        <ToggleButtonGroup
          color="info"
          value={formik.values.is_generated}
          onChange={(event, newValue) => {
            if (newValue === null) return;
            formik.setFieldValue("is_generated", newValue);
          }}
          exclusive
          size="small"
        >
          <ToggleButton value={false}>Recebido</ToggleButton>
          <ToggleButton value={true}>Gerado</ToggleButton>
        </ToggleButtonGroup>

        <FormGroup>
          <FormControlLabel
            onChange={() => setIsDue((prev) => !prev)}
            value={isDue}
            control={<Switch />}
            label={"Possui prazo?"}
          />
        </FormGroup>
        <DatePicker
          disabled={!isDue}
          label="Prazo"
          name="due_to"
          value={formik.values.due_to}
          onChange={(newValue) => formik.setFieldValue("due_to", newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          disableElevation
          loading={mutation.isLoading}
        >
          Salvar
        </LoadingButton>
      </Stack>
    </form>
  );
}
