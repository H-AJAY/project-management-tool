import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "axios";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-management-tool-z7ty.onrender.com/projects")
      .then((res) => {
        setProjects(res.data);
      });
  }, []);

  return (
    <Card sx={{ my: 3, mx: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Projects
        </Typography>
        <List>
          {projects.map((project) => (
            <ListItem key={project._id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={project.name}
                secondary={project.description}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default ProjectList;
