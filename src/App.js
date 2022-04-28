import { BrowserRouter as Router } from "react-router-dom";
import InitialLoading from "./pages/InitialLoading";
import Snackbar from "./components/Snackbar";
import AppRoutes from "./routes/AppRoutes";
import useInitialLoad from "./hooks/useInitialLoad";

export default function App() {
  const { loading } = useInitialLoad();

  if (loading) return <InitialLoading />;

  return (
    <Router>
      <Snackbar />
      <AppRoutes />
    </Router>
  );
}
