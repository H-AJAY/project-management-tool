import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [taskStats, setTaskStats] = useState({ completed: 0, pending: 0 });

  useEffect(() => {
    axios.get("https://project-management-tool-z7ty.onrender.com/tasks").then((res) => {
      const tasks = res.data;
      const completed = tasks.filter((task) => task.status === "Completed").length;
      const pending = tasks.length - completed;
      setTaskStats({ completed, pending });
    });
  }, []);

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    axios.get("https://project-management-tool-z7ty.onrender.com/tasks")
      .then((res) => {
        const tasks = res.data;

        // 🔢 Group tasks by project name
        const grouped = tasks.reduce((acc, task) => {
          const projectName = task.project?.name || "Unknown";
          acc[projectName] = (acc[projectName] || 0) + 1;
          return acc;
        }, {});

        // 📊 Convert to chart-friendly format
        const chartData = Object.keys(grouped).map((name) => ({
          name,
          tasks: grouped[name],
        }));

        setTaskData(chartData);

        // ✅ Also update pie chart
        const completed = tasks.filter((task) => task.status === "Completed").length;
        const pending = tasks.length - completed;
        setTaskStats({ completed, pending });
      });
  }, []);


  const pieData = [
    { name: "Completed", value: taskStats.completed },
    { name: "Pending", value: taskStats.pending },
  ];

  const COLORS = ["#4caf50", "#f44336"];

  return (
    <Box sx={{ padding: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <DashboardIcon color="primary" />
        <Typography variant="h4">Welcome, {user?.name}!</Typography>
      </Stack>
      <Typography variant="subtitle1" gutterBottom>
        Role: {user?.role}
      </Typography>

      {user?.role === "manager" && (
        <>
          <Link to="/projects">
            <Button variant="contained" sx={{ m: 1 }} startIcon={<FolderIcon />}>
              Manage Projects
            </Button>
          </Link>
          <Link to="/tasks">
            <Button variant="contained" sx={{ m: 1 }} startIcon={<AssignmentIcon />}>
              Manage Tasks
            </Button>
          </Link>
        </>
      )}

      {user?.role === "employee" && (
        <Link to="/tasks">
          <Button variant="contained" sx={{ m: 1 }} startIcon={<AssignmentIcon />}>
            My Tasks
          </Button>
        </Link>
      )}

      <Button
        variant="outlined"
        color="error"
        onClick={logout}
        sx={{ m: 1 }}
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>

      {/* Chart Section */}
      <Box sx={{ mt: 4 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <BarChartIcon color="primary" />
              <Typography variant="h5">Task Distribution</Typography>
            </Stack>
            <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <DonutLargeIcon color="secondary" />
              <Typography variant="h6">Task Completion Status</Typography>
            </Stack>
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
