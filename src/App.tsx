import CssBaseline from '@mui/material/CssBaseline';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { DemoDogAppBar, DemoDogDialog, ScrollToTop, colors } from './components';
import {
  SignInPage,
  SignUpPage,
  StartupDashboard,
} from './pages';
import { SideNav } from './components/Sidenav';
import { useIsLoading } from './hooks';
import { DemoDogLandingPage } from './static-pages';
import { Footer } from './static-pages/footer';

const ApplicationContainer = styled(Grid)`
  font-family: 'Montserrat', 'Varela Round', sans-serif;
  margin: 0;
  padding: 0;
`;

type AppDisplayLayerProps = {
  isLoading: boolean;
  theme: Theme;
}

export default function App() {
  return <App_DisplayLayer {...useDataLayer()} />;
}

function App_DisplayLayer({
  isLoading,
  theme,
}: AppDisplayLayerProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApplicationContainer container>
        <Router>
          <ScrollToTop />
          <Backdrop
            open={isLoading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="primary" />
          </Backdrop>
          <DemoDogDialog />
          <DemoDogAppBar />
          <Routes>
            <Route path="/" element={<DemoDogLandingPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/startup-dashboard" element={<SideNav />}>
              <Route element={<StartupDashboard />} path="main"/>
            </Route>
          </Routes>
          <Footer />
        </Router>
      </ApplicationContainer>
    </ThemeProvider>
  );
}

function useDataLayer() {
  const { isLoading } = useIsLoading();

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: colors.navyBlue,
      },
      secondary: {
        main: colors.salmonPink,
      },
    },
    typography: {
      fontFamily: 'Montserrat',
    },
  });

  return {
    isLoading,
    theme,
  };
}
