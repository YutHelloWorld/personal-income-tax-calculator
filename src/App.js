import React, { Suspense, lazy } from 'react';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import {
  createMuiTheme,
  MuiThemeProvider,
  withTheme
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './component/Layout';
import ScrollToTop from './component/ScrollToTop';
import store from './store/createStore';

const Result = lazy(() => import('./container/ResultContainer'));
const City = lazy(() => import('./container/CityContainer'));

function App({ theme }) {
  const matchesDwonSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Switch>
      <Suspense fallback={<LinearProgress />}>
        <Route
          exact
          path="/"
          render={props => <Layout {...props} matchesDwonSm={matchesDwonSm} />}
        />
        <Route path="/result" render={props => <Result {...props} />} />
        <Route path="/city" render={props => <City {...props} />} />
      </Suspense>
    </Switch>
  );
}

const ThemeApp = withTheme()(App);

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: blue,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

export default function ThemeHelper() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router basename="/personal-income-tax-calculator/">
          <ScrollToTop>
            <ThemeApp />
          </ScrollToTop>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}
