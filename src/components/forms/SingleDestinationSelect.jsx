import { useQuery } from "react-query";
import { DestinationService } from "../../services/api";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";

export default function OriginSelect({
  formHandler,
  fieldName = "destination_id",
  initialValue = null,
  variant = "outlined",
}) {
  const { isLoading, error, data } = useQuery(
    "destinations",
    () => DestinationService.fetchDestinations(),
    {
      retry: false,
    }
  );

  if (isLoading)
    return <Select label="Destino" defaultValue="" disabled fullWidth />;

  if (error)
    return (
      <FormControl htmlFor="Destino" fullWidth disabled>
        <InputLabel id="Destino">"Destino"</InputLabel>
        <Select label="Destino" variant={variant} defaultValue="" />
      </FormControl>
    );

  function getDefaultValue(initialValue) {
    if (initialValue === null) return null;
    const defaultValue = data.filter(
      (location) => location.id === initialValue.id
    );
    return defaultValue[0];
  }

  return (
    <Autocomplete
      options={data}
      variant={variant}
      defaultValue={
        initialValue === null ? null : getDefaultValue(initialValue)
      }
      renderInput={(params) => (
        <TextField variant={variant} label="Destino" {...params} />
      )}
      getOptionLabel={(option) => option.name}
      onChange={(event, value) =>
        value
          ? formHandler.setFieldValue(fieldName, value.id)
          : formHandler.setFieldValue(fieldName, "")
      }
      renderOption={(props, option) => (
        <Box {...props} component="li">
          {option.name} {option.short_name && `- ${option.short_name}`}
        </Box>
      )}
    />
  );
}
