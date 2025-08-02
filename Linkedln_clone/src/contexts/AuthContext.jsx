import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize token and user from localStorage (if available)
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login function: save token and user info
  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
  };

  // Logout function: clear auth state
  const logout = () => {
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
