import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Track loading status

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ Finish loading once user check is done
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('https://project-management-tool-z7ty.onrender.com/api/auth/login', {
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
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
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // optional cleanup
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
