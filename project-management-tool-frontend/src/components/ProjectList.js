import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("https://project-management-tool-z7ty.onrender.com/projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h5">Projects</Typography>
        <List>
          {projects.map((project) => (
            <ListItem key={project._id}>
              <ListItemText primary={project.name} secondary={project.description} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default ProjectList;