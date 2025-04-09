// src/App.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/authContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import TaskManager from "./components/TaskManager";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ProjectList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute allowedRoles={["employee", "manager"]}>
              <TaskManager />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />
        
        {/* ✅ Add this to fix the error */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
