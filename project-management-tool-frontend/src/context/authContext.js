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
    try {
      const res = await axios.post('https://project-management-tool-z7ty.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      throw new Error("Login failed. Please check your credentials.");
    }
  };  
  
  const register = async (name, email, password, role) => {
    try {
      const res = await axios.post('https://project-management-tool-z7ty.onrender.com/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message); // Debug info
      throw new Error("Registration failed. Please try again.");
    }
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
