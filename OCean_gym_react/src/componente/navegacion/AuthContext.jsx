import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(escape(window.atob(base64)));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error parsing JWT:", e);
      return null;
    }
  };

  useEffect(() => {
    const token = Cookies.get('user_token');
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setIsAuthenticated(true);
        setUser(decodedToken.name);
        setUserRole(decodedToken.role);
      }
    }
  }, []);

  const login = (token) => {
    Cookies.set('user_token', token, { path: '/' });
    const decodedToken = parseJwt(token);
    
    if (decodedToken) {
      setIsAuthenticated(true);
      setUser(decodedToken.name);
      setUserRole(decodedToken.role);
    }
  };

  const logout = () => {
    Cookies.remove('user_token', { path: '/' });
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);