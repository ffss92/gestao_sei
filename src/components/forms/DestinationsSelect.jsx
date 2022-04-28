import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { DestinationService } from "../../services/api";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function DestinationsSelect({ initialDestinations, setValues }) {
  const [destinations, setDestinations] = useState(initialDestinations || []);

  const { isLoading, error, data } = useQuery(
    "destinations",
    () => DestinationService.fetchDestinations(),
    {
      retry: false,
    }
  );

  const handleDelete = (destination) => {
    const data = destinations.filter((item) => item.id !== destination.id);
    setDestinations(data);
  };

  useEffect(() => {
    setValues(destinations.map((destination) => destination.id));
  }, [destinations, setValues]);

  if (isLoading)
    return <Select label={"Destinos"} defaultValue="" disabled fullWidth />;

  if (error)
    return (
      <FormControl htmlFor={"Destinos"} fullWidth disabled>
        <InputLabel id={"Destinos"}>{"Destinos"}</InputLabel>
        <Select label={"Destinos"} defaultValue="" />
      </FormControl>
    );

  return (
    <Stack spacing={1}>
      <Autocomplete
        fullWidth
        options={data}
        renderInput={(params) => <TextField label="Destinos" {...params} />}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => {
          if (destinations.includes(value) || value === null) return;
          setDestinations((prev) => [...prev, value]);
        }}
        renderOption={(props, option) => (
          <Box {...props} component="li">
            {option.name}
          </Box>
        )}
      />

      {destinations.length !== 0 &&
        destinations.map((destination) => (
          <Box key={destination.id}>
            <Chip
              label={destination.name}
              variant="outlined"
              onDelete={() => handleDelete(destination)}
            />
          </Box>
        ))}
    </Stack>
  );
}
