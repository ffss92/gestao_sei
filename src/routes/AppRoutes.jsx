import { Route, Routes } from "react-router-dom";
import {
  People,
  PersonDetail,
  PersonEdit,
  PersonCreate,
} from "../pages/people";
import { Teams, TeamDetail, TeamEdit } from "../pages/teams";
import {
  ProcessSearch,
  ProcessDetail,
  Processes,
  ProcessCreate,
  ProcessEdit,
  ProcessAdvancedSearch,
} from "../pages/process";
import {
  DestinationEdit,
  Destinations,
  DestinationCreate,
} from "../pages/destination";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Account from "../pages/Account";
import AdminUser from "../pages/admin/AdminUser";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="conta" element={<Account />} />
        <Route path="equipes" element={<Teams />} />
        <Route path="equipes/:id" element={<TeamDetail />} />
        <Route path="servidores" element={<People />} />
        <Route path="servidores/:id" element={<PersonDetail />} />
        <Route path="processos" element={<Processes />} />
        <Route path="processos/:id" element={<ProcessDetail />} />
        <Route path="processos/:id/editar" element={<ProcessEdit />} />
        <Route path="processos/criar" element={<ProcessCreate />} />
        <Route path="processos/pesquisar" element={<ProcessSearch />} />
        <Route
          path="processos/pesquisa-avancada"
          element={<ProcessAdvancedSearch />}
        />
        <Route path="destinos" element={<Destinations />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<AdminRoute />}>
          <Route path="admin/users" element={<AdminUser />} />
          <Route path="destinos/criar" element={<DestinationCreate />} />
          <Route path="servidores/:id/editar" element={<PersonEdit />} />
          <Route path="equipes/:id/editar" element={<TeamEdit />} />
          <Route path="destinos/:id/editar" element={<DestinationEdit />} />
          <Route path="servidores/criar" element={<PersonCreate />} />
        </Route>
      </Route>
    </Routes>
  );
}
