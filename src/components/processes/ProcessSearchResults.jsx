import { useQuery } from "react-query";
import { ProcessService } from "../../services/api";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../feedback/LoadingSpinner";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import ProcessTable from "../../components/processes/ProcessTable";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function ProcessSearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let searchText = searchParams.get("search");
  if (searchText === "") searchText = null;
  useEffect(() => {
    setPage(1);
  }, [searchText]);

  const handleClick = () => {
    navigate("/processos/criar");
  };
  const [page, setPage] = useState(1);
  const handleChange = (_event, value) => {
    setPage(value);
  };

  const { isLoading, error, data } = useQuery(
    ["processes", { limit: 15, page, q: searchText }],
    () => ProcessService.fetchProcesses({ limit: 15, page, q: searchText }),
    { retry: false }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error?.response?.status === 404)
    return (
      <Box
        display="flex"
        flexGrow={1}
        flexDirection="column"
        minHeight={600}
        justifyItems="center"
        alignItems="center"
      >
        <Alert
          sx={{ dispaly: "flex", alignItems: "center" }}
          severity="warning"
        >
          <Box>
            Nenhum processo encontrado.
            <Button sx={{ marginLeft: 1 }} onClick={handleClick}>
              Cadastrar novo
            </Button>
          </Box>
        </Alert>
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        flexGrow={1}
        flexDirection="column"
        minHeight={600}
        justifyItems="center"
        alignItems="center"
      >
        <Alert severity="error">
          Erro carregando os dados. Verifique sua conexão ou tente novamente
          mais tarde.
        </Alert>
      </Box>
    );

  return (
    <Stack height="100%" spacing={4}>
      <Box display="flex">
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Typography variant="h6">
              {searchText
                ? `Pesquisa: '${searchText}'`
                : `Exibindo todos os processos`}
            </Typography>
            <Typography variant="body2">
              Resultados: {data.meta.count}
            </Typography>
            <ProcessTable data={data.data} />
          </Stack>
        </Container>
      </Box>

      <Box display="flex" flex={1} justifyContent="center" alignItems="end">
        <Pagination
          color="primary"
          count={data.meta.total_pages}
          onChange={handleChange}
          page={page}
        />
      </Box>
    </Stack>
  );
}
