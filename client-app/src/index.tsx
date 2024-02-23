import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './custom.css';
import { GreeterClient } from './grpc-compiled/greet.client';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

export const client: GreeterClient = new GreeterClient(new GrpcWebFetchTransport({
  baseUrl: "/"
}));

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
