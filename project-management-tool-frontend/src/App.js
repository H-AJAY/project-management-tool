import React from "react";
import { Container, Typography } from "@mui/material";
import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Project Management Tool</Typography>
      <Dashboard />
      <ProjectList />
      <TaskManager />
    </Container>
  );
}

export default App;
