import { useQuery } from "react-query";
import { DestinationService } from "../../services/api";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import LoadingSpinner from "../feedback/LoadingSpinner";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DestinationTableActions from "./DestinationTableActions";

export default function DestionationTable() {
  const user = useSelector((state) => state.user.value);
  const { isLoading, error, data } = useQuery(
    "destinations",
    () => DestinationService.fetchDestinations(),
    {
      retry: false,
    }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error?.response?.status === 404)
    return <Alert severity="warning">Nenhum destino encontrado.</Alert>;

  if (error)
    return (
      <Alert severity="error">
        Erro carregando os dados. Verifique sua conexão ou tente novamente mais
        tarde.
      </Alert>
    );

  return (
    <TableContainer component={Paper}>
      <Box display="flex" padding={2} flexDirection="column">
        <Typography gutterBottom variant="h4">
          Origens / Destinos
        </Typography>
      </Box>
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Sigla</TableCell>
            {user.is_admin && <TableCell align="right">Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((destination) => (
            <TableRow
              key={destination.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{destination.name}</TableCell>
              <TableCell align="right">
                {destination.short_name ? destination.short_name : "Não possui"}
              </TableCell>
              {user.is_admin && (
                <DestinationTableActions destinationId={destination.id} />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
