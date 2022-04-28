import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

export default function ProcessSearchBar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleClear = () => {
    setSearchText("");
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/processos/pesquisar?search=${searchText}`);
  };

  return (
    <Stack position="relative">
      <Paper
        onKeyDown={(event) => {
          if (event.key === "Escape") return handleClear();
        }}
        component="form"
        onSubmit={handleClick}
        variant="outlined"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          border: 1,
          borderColor: "divider",
          borderRadius: 6,
        }}
      >
        <InputBase
          sx={{
            ml: 1.5,
            flex: 1,
          }}
          placeholder="Digite um número, descrição, assunto ou responsável"
          value={searchText}
          onChange={handleChange}
        />
        {searchText !== "" && (
          <Tooltip title="Limpar texto">
            <IconButton onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
        {searchText === "" ? (
          <IconButton disabled type="submit">
            <SearchIcon />
          </IconButton>
        ) : (
          <Tooltip title="Pesquisar processo">
            <IconButton color="info" type="submit">
              <SearchIcon />
            </IconButton>
          </Tooltip>
        )}
      </Paper>
    </Stack>
  );
}
