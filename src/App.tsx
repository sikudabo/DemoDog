import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { colors } from './components';
import { DemoDogLandingPage } from './static-pages';
import { Footer } from './static-pages/footer';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
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
          <Routes>
            <Route path="/" element={<DemoDogLandingPage />} />
          </Routes>
          <Footer />
        </Router>
      </ApplicationContainer>
    </ThemeProvider>
  );
}

export default App;
