import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { DemoDogAppBar, ScrollToTop, colors } from './components';
import {
  SignUpPage,
} from './pages';
import { DemoDogLandingPage } from './static-pages';
import { Footer } from './static-pages/footer';

const theme = createTheme({
  palette: {
    mode: 'light',
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

const ApplicationContainer = styled(Grid)`
  font-family: 'Montserrat', 'Varela Round', sans-serif;
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApplicationContainer container>
        <Router>
          <ScrollToTop />
          <DemoDogAppBar />
          <Routes>
            <Route path="/" element={<DemoDogLandingPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
          <Footer />
        </Router>
      </ApplicationContainer>
    </ThemeProvider>
  );
}

export default App;
