import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [User, SetName] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
      if (token) {
        setIsAuthenticated(true);
        setRole(localStorage.getItem('role'));
        SetName(localStorage.getItem('UserName'));
      } else {
        setIsAuthenticated(false);
        setRole(null);
        SetName(null);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const login = (token, userRole, NombreUser) => {
    document.cookie = `token=${token}; path=/;`;
    localStorage.setItem('role', userRole);
    localStorage.setItem('UserName', NombreUser);
    setIsAuthenticated(true);
    setRole(userRole);
    SetName(NombreUser); 
  };

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('role');
    localStorage.removeItem('UserName');
    setIsAuthenticated(false);
    setRole(null);
    SetName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, User }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
