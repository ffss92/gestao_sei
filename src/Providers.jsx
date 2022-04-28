import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ptBR } from "date-fns/locale";
import { amber, grey } from "@mui/material/colors";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import store from "./store";

const queryClient = new QueryClient();

let theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: amber[500],
    },
  },
});
theme = responsiveFontSizes(theme);

export default function Providers({ children }) {
  return (
    <LocalizationProvider locale={ptBR} dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
