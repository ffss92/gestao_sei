import { useQuery } from "react-query";
import { UserService } from "../../services/api";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import PersonSelect from "../forms/PersonSelect";
import SingleDestinationSelect from "../forms/SingleDestinationSelect";
import OriginSelect from "../forms/OriginSelect";

export default function AdvancedSearchForm({ formHandler }) {
  const { data, isLoading, error } = useQuery("users", () =>
    UserService.fetchActiveUsers()
  );

  return (
    <form onSubmit={formHandler.handleSubmit}>
      <Stack spacing={1}>
        <TextField
          value={formHandler.values.subject}
          onChange={formHandler.handleChange}
          name="subject"
          label="Assunto"
          variant="standard"
        />

        <TextField
          value={formHandler.values.description}
          onChange={formHandler.handleChange}
          name="description"
          label="Descrição"
          variant="standard"
        />

        <PersonSelect variant="standard" formHandler={formHandler} />

        <OriginSelect variant="standard" formHandler={formHandler} />

        <SingleDestinationSelect variant="standard" formHandler={formHandler} />

        <FormControl variant="standard">
          <InputLabel>Criado por</InputLabel>
          <Select
            variant="standard"
            name="created_by"
            disabled={isLoading || error}
            value={formHandler.values.created_by}
            onChange={formHandler.handleChange}
            label="Criado por"
          >
            <MenuItem value="">Nenhum</MenuItem>
            {data && !isLoading
              ? data.map((user) => (
                  <MenuItem value={user.id} key={user.id}>
                    {user.email}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>

        <DatePicker
          maxDate={new Date()}
          value={formHandler.values.date}
          onChange={(newValue) => formHandler.setFieldValue("date", newValue)}
          name="date"
          label="Mês de cadastro"
          views={["year", "month"]}
          renderInput={(props) => <TextField variant="standard" {...props} />}
        />

        <Stack direction="row" spacing={1}>
          <LoadingButton variant="contained" disableElevation type="submit">
            Pesquisar
          </LoadingButton>
          <Button onClick={() => formHandler.resetForm({ values: "" })}>
            Limpar Formulário
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
