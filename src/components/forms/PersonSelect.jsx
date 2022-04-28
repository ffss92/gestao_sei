import { useQuery } from "react-query";
import { useState } from "react";
import { PersonService } from "../../services/api";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

export default function PersonSelect({
  formHandler,
  fieldName = "person_id",
  variant = "outlined",
  initialValue = null,
}) {
  const { isLoading, error, data } = useQuery("people", () =>
    PersonService.fetchPeople()
  );
  const [onVacation, setOnVacation] = useState(false);

  if (isLoading) return <Select defaultValue="" variant={variant} disabled />;
  if (error) return <Select defaultValue="" variant={variant} disabled />;

  function getDefaultValue(initialValue) {
    if (initialValue === null) return null;
    const defaultValue = data.filter((person) => person.id === initialValue.id);
    return defaultValue[0];
  }

  return (
    <Stack spacing={1.5}>
      {onVacation && (
        <Alert severity="warning">Servidor em período de férias</Alert>
      )}

      <Autocomplete
        options={data}
        defaultValue={
          initialValue === null ? null : getDefaultValue(initialValue)
        }
        renderInput={(params) => (
          <TextField variant={variant} label="Responsável" {...params} />
        )}
        getOptionLabel={(option) => option.full_name}
        onChange={(event, value) => {
          value
            ? formHandler.setFieldValue(fieldName, value.id)
            : formHandler.setFieldValue(fieldName, "");
          value
            ? setOnVacation(value.on_vacation ? true : false)
            : setOnVacation(false);
        }}
        renderOption={(props, option) => (
          <Box {...props} component="li">
            {option.full_name} {option.on_vacation ? "(Férias)" : ""}
          </Box>
        )}
      />
    </Stack>
  );
}
