import { useFormik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { ProcessService } from "../../services/api";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AdvancedSearchForm from "../../components/processes/AdvancedSearchForm";
import Alert from "@mui/material/Alert";
import ProcessTable from "../../components/processes/ProcessTable";
import Box from "@mui/material/Box";

export default function ProcessAdvancedSearch() {
  const [params, setParams] = useState(null);
  const [page, setPage] = useState(1);
  const formik = useFormik({
    initialValues: {
      subject: "",
      description: "",
      created_by: "",
      person_id: "",
      destination_id: "",
      date: null,
    },
    onSubmit: (data) => {
      const sanitizedData = { ...data };
      setPage(1);
      function nullifyEmpty(object) {
        Object.keys(object).forEach((key) => {
          if (object[key] === "") object[key] = null;
        });
      }
      nullifyEmpty(sanitizedData);
      setParams(sanitizedData);
    },
  });

  const { isIdle, data, error } = useQuery(
    ["processes", { params, page }],
    () => ProcessService.advancedSearch({ ...params, page, limit: 15 }),
    {
      enabled: !!params,
      retry: false,
    }
  );

  return (
    <Grid container>
      <Grid item xs={12} marginY={4}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Pesquisa Avançada
          </Typography>
          <AdvancedSearchForm formHandler={formik} />
        </Container>
      </Grid>
      <Grid item xs={12} marginY={3}>
        {!isIdle && error ? (
          <Container maxWidth="sm">
            <Alert severity="error">
              {error.response?.status === 404
                ? "Nenhum processo encontrado"
                : "Erro buscando os processos"}
            </Alert>
          </Container>
        ) : null}
        {!error && data ? (
          <Container>
            <Stack alignItems="center" spacing={2}>
              <Box width="100%">
                <Typography variant="body2">
                  Resultados: {data.meta.count}
                </Typography>
              </Box>
              <ProcessTable data={data.data} />
              <Pagination
                count={data.meta.total_pages}
                page={page}
                onChange={(e, newValue) => setPage(newValue)}
              />
            </Stack>
          </Container>
        ) : null}
      </Grid>
    </Grid>
  );
}
