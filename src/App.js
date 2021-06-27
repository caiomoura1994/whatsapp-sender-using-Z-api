import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SnackbarProvider } from 'notistack';

import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { auth } from './services/firebase';

const App = () => {
  const [user, isLoading] = useAuthState(auth);
  const activedRoutes = user ? '/app/dashboard' : '/login';
  const routing = useRoutes(routes(activedRoutes));

  if (isLoading) {
    return (
      <div>
        carregando ...
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={5}>
        <GlobalStyles />
        {routing}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
