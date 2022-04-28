import { useQuery } from "react-query";
import { PersonService } from "../../services/api";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../feedback/LoadingSpinner";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StyledLink from "@mui/material/Link";
import PeopleTableActions from "./PeopleTableActions";

export default function PeopleTable() {
  const user = useSelector((state) => state.user.value);
  const { data, isLoading, error } = useQuery(
    "people",
    () => PersonService.fetchPeople(),
    {
      retry: false,
    }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error?.response?.status === 404)
    return <Alert severity="warning">Nenhum servidor encontrado.</Alert>;

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
          Servidores
        </Typography>
      </Box>
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Telefone</TableCell>
            <TableCell align="right">Ramal</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Equipe</TableCell>
            {user.is_admin && <TableCell align="right">Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((person) => (
            <TableRow
              key={person.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <StyledLink component={Link} to={`/servidores/${person.id}`}>
                  {person.full_name}
                </StyledLink>
              </TableCell>
              <TableCell align="right">
                {person.phone_number || "Não possui"}
              </TableCell>
              <TableCell align="right">
                {person.work_phone || "Não possui"}
              </TableCell>
              <TableCell align="right">{person.professional_email}</TableCell>
              <TableCell align="right">
                {person.team ? (
                  <StyledLink
                    component={Link}
                    to={`/equipes/${person.team.id}`}
                  >
                    {person.team.name}
                  </StyledLink>
                ) : (
                  "Não possui"
                )}
              </TableCell>

              {user.is_admin && <PeopleTableActions personId={person.id} />}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
