import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Application from './components/Application';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <React.StrictMode>
      <Application />
    </React.StrictMode>
  </CookiesProvider>
);

reportWebVitals();
