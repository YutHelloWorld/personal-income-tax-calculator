import React, { Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from '@material-ui/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './component/Layout';
import ScrollToTop from './component/ScrollToTop';
const Result = lazy(() => import('./component/Result'));

function App() {
  const theme = useTheme();
  const matchesDwonSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Switch>
      <Suspense fallback={<LinearProgress />}>
        <Route
          exact
          path="/"
          render={() => <Layout matchesDwonSm={matchesDwonSm} />}
        />
        <Route path="/result" render={props => <Result {...props} />} />
      </Suspense>
    </Switch>
  );
}

const theme = createMuiTheme({ typography: { useNextVariants: true } });

export default function ThemeHelper() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </ThemeProvider>
  );
}
