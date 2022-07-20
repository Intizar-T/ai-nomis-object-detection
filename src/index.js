import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/main components/App';
import { ContextProvider } from './components/context/context';

import { ThemeProvider } from "@material-tailwind/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
