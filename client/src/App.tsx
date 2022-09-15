import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Home from './pages/Home';
import CssBaseline from '@mui/material/CssBaseline';
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
   hi:string
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    hi?:string;
  }
}



const theme = createTheme({
  status: {
    danger: orange[500],
  },
  typography:{
    fontWeightBold:900
  },
  hi:"holla"
});


function App() {

  console.log(theme)

  return (
    <ThemeProvider theme={theme}>
    <div className="app">
      <CssBaseline/>
      <Home/>
    </div>
    </ThemeProvider>
  );
}

export default App;
