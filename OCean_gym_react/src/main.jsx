import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './componente/navegacion/AuthContext.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
);