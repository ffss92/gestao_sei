import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { ProcessService } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import DatePicker from "@mui/lab/DatePicker";
import * as yup from "yup";
import DestinationsSelect from "../forms/DestinationsSelect";
import PersonSelect from "../forms/PersonSelect";
import OriginSelect from "../forms/OriginSelect";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import useSnackbar from "../../hooks/useSnackbar";

const validationSchema = yup.object({
  number: yup
    .string()
    .required("Campo obrigatório.")
    .matches(/^\d{4}.\d{2}.\d{7}\/\d{4}-\d{2}$/, "Formato inválido."),
  is_active: yup.boolean().required("Campo obrigatório"),
  is_generated: yup.boolean().required("Campo obrigatório."),
  subject: yup
    .string()
    .required("Campo obrigatório.")
    .max(255, "Máximo de 255 caracteres."),
  description: yup.string().max(600, "Máximo de 600 caracteres.").nullable(),
  person_id: yup.number(),
});

export default function EditProcessForm({ data }) {
  const { displaySnackbar } = useSnackbar();
  const [isDue, setIsDue] = useState(!!data.due_to);
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => ProcessService.editProcess(id, data), {
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries("processes");
      queryClient.invalidateQueries(["process", id]);
      displaySnackbar({
        message: "Processo editado com sucesso!",
        severity: "info",
      });
      navigate(`/processos/${id}`);
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

  useEffect(() => {
    setDestinations(data.destinations.map((destination) => destination.id));
  }, [data.destinations]);

  const formik = useFormik({
    initialValues: {
      number: data.number,
      is_active: data.is_active,
      is_generated: data.is_generated,
      subject: data.subject,
      description: data.description,
      person_id: data.person_id,
      origin_id: data.origin_id,
      due_to: data.due_to || new Date(),
    },
    onSubmit: (data) => {
      const sanitaziedData = { ...data };
      if (sanitaziedData.origin_id === "") sanitaziedData.origin_id = null;
      if (sanitaziedData.person_id === "") sanitaziedData.person_id = null;
      if (destinations.length !== 0) {
        sanitaziedData.destination_ids = destinations;
      } else {
        sanitaziedData.destination_ids = [];
      }
      if (!isDue) sanitaziedData.due_to = null;
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

        {/* Responsável */}
        <PersonSelect formHandler={formik} initialValue={data.responsible} />

        {/* Origem */}
        <OriginSelect formHandler={formik} initialValue={data.origin} />

        {/* Destinos */}
        <DestinationsSelect
          setValues={setDestinations}
          initialDestinations={data.destinations}
        />

        {/* Recebido / Gerado */}
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

        {/* DatePicker e Switch */}
        <FormGroup>
          <FormControlLabel
            onChange={() => setIsDue((prev) => !prev)}
            value={isDue}
            checked={isDue ? true : false}
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

        {/* Submit */}
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
