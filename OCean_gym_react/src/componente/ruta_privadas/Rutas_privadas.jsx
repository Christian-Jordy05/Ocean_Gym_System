import React from 'react';
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

function RutasPrivadas() {
  const token = Cookies.get('user_token');
  
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(escape(window.atob(base64)));
    return JSON.parse(jsonPayload);
  };

  if (!token) {
    return <Navigate to="/Error" />;
  }

  const decoded = parseJwt(token);
  const role = decoded.role;
  console.log("Rol:", role);

  if (role !== "admin") {
    return <Navigate to="/Error" />;
  }

  return <Outlet />;
}

export default RutasPrivadas;