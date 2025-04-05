import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Project A", tasks: 12 },
  { name: "Project B", tasks: 8 },
  { name: "Project C", tasks: 15 },
];

function Dashboard() {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h5">Tasks Overview</Typography>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tasks" fill="#1976d2" />
        </BarChart>
      </CardContent>
    </Card>
  );
}

export default Dashboard;