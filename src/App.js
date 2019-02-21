import React from 'react';
import { ThemeProvider, useTheme } from '@material-ui/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './component/Layout';
import Result from './component/Result';

function App() {
  const theme = useTheme();
  const matchesDwonSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Layout matchesDwonSm={matchesDwonSm} />}
      />
      <Route path="/result" component={Result} />
    </Switch>
  );
}

const theme = createMuiTheme({ typography: { useNextVariants: true } });

export default function ThemeHelper() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route component={App} />
      </Router>
    </ThemeProvider>
  );
}
