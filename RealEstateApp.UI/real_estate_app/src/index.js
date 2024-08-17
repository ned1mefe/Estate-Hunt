import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@mui/material";
import { AuthProvider } from './API/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFF1",
      dark: "#1D1A39",
      contrastText: '#fff'
    },
    secondary: {
      main: "#D37F3A",
      dark: "#AE445A",
      contrastText: '#fff'
    }
  },
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
