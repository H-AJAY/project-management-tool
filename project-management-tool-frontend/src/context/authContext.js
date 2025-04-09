import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('https://project-management-tool-z7ty.onrender.com/api/auth/login', {
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token); // ✅
    setUser(res.data.user);
  };
  
  const register = async (name, email, password, role) => {
    const res = await axios.post('https://project-management-tool-z7ty.onrender.com/api/auth/register', {
      name,
      email,
      password,
      role,
    });
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token); // ✅
    setUser(res.data.user);
  };      

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
