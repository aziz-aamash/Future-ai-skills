import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './admin/context/DataContext.tsx';
import App from './App.jsx';
import './styles.css';

/* DataProvider lives here, above the router, so the public site
   (Home page, NotifyBar, etc.) and the /admin panel both read
   and write the exact same in-memory data. Add something in the
   admin panel -> it shows up on the public pages immediately. */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
