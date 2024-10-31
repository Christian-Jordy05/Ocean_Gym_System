import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(null); 

  const parseJwt = (token) => {
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error parsing JWT:", e);
      return null;
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = Cookies.get('user_token');
      if (storedToken) {
        try {
          const decodedToken = parseJwt(storedToken);
          if (decodedToken) {
           
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp && decodedToken.exp > currentTime) {
              setToken(storedToken);
              setIsAuthenticated(true);
              setUser(decodedToken.name || null);
              setUserRole(decodedToken.role || null);
              console.log('Token decoded successfully:', decodedToken);
            } else {
              console.log('Token expired');
              logout();
            }
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          logout();
        }
      }
    };

    checkAuth();

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval); 
      }
    };
  }, [refreshInterval]);

  const login = async (newToken) => {
    try {
      const decodedToken = parseJwt(newToken);
      console.log('Decoded token:', decodedToken); 

      if (!decodedToken) {
        throw new Error('Token inválido');
      }

      
      Cookies.set('user_token', newToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        expires: 1 //1 dia expira 
      });

      setToken(newToken);
      setIsAuthenticated(true);
      setUser(decodedToken.name || null);
      setUserRole(decodedToken.role || null);

      if (refreshInterval) clearInterval(refreshInterval); 
      const interval = setInterval(refreshAccessToken, 15 * 60 * 1000); //refresca cada 15 minutos
      setRefreshInterval(interval);

    } catch (error) {
      console.error('Error during login:', error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('user_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);
    
    if (refreshInterval) clearInterval(refreshInterval); // Limpiar intervalo al cerrar sesión
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch('http://localhost:8000/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      
      if (!data.access) {
        throw new Error('No access token in refresh response');
      }

      await login(data.access);
      return data.access;

    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  };


  const isTokenExpired = () => {
    if (!token) return true;
    const decodedToken = parseJwt(token);
    if (!decodedToken) return true;
    const currentTime = Date.now() / 1000;
    return decodedToken.exp ? decodedToken.exp < currentTime : true;
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      token,
      user,
      userRole,
      login,
      logout,
      refreshAccessToken,
      isTokenExpired,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
