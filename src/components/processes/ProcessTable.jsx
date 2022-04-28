import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import StyledLink from "@mui/material/Link";

export default function ProcessTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Número</TableCell>
            <TableCell align="right">Responsável</TableCell>
            <TableCell align="right">Assunto</TableCell>
            <TableCell align="right">Gerado / Recebido</TableCell>
            <TableCell align="right">Situação</TableCell>
            <TableCell align="right">Criado por</TableCell>
            <TableCell align="right">Criado em</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((process) => (
            <TableRow
              key={process.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <StyledLink to={`/processos/${process.id}`} component={Link}>
                  {process.number}
                </StyledLink>
              </TableCell>
              <TableCell align="right">
                {process.responsible ? (
                  <StyledLink
                    component={Link}
                    to={`/servidores/${process.responsible.id}`}
                  >
                    {process.responsible.full_name}
                  </StyledLink>
                ) : (
                  "Não possui"
                )}
              </TableCell>
              <TableCell align="right">{process.subject}</TableCell>
              <TableCell align="right">
                {process.is_generated ? "Gerado" : "Recebido"}
              </TableCell>
              <TableCell align="right">
                {process.is_active ? "Aberto" : "Fechado"}
              </TableCell>
              <TableCell align="right">
                {process.user?.email || "Não possui"}
              </TableCell>
              <TableCell align="right">
                {new Date(process.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
