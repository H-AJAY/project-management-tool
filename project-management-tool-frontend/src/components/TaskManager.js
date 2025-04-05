import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get("https://project-management-tool-z7ty.onrender.com/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const addTask = () => {
    if (!newTask.trim()) {
      console.error("Task name is empty!");
      return;
    }
  
    axios.post("https://project-management-tool-z7ty.onrender.com/tasks", { name: newTask })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setNewTask("");
      })
      .catch((err) => {
        console.error("Failed to add task:", err);
      });
  };    

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h5">Task Manager</Typography>
        <TextField label="New Task" value={newTask} onChange={(e) => setNewTask(e.target.value)} fullWidth sx={{ my: 1 }} />
        <Button variant="contained" onClick={addTask}>Add Task</Button>
        <List>
          {tasks.map((task) => (
            <ListItem key={task._id}>
              <ListItemText primary={task.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TaskManager;