import React from 'react';
import { ThemeProvider, useTheme } from '@material-ui/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';
import Layout from './component/Layout';

function App() {
  const theme = useTheme();
  const matchesDwonSm = useMediaQuery(theme.breakpoints.down('sm'));
  return <Layout matchesDwonSm={matchesDwonSm} />;
}

const theme = createMuiTheme({ typography: { useNextVariants: true } });

export default function ThemeHelper() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
