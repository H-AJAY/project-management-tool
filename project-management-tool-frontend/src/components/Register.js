import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, MenuItem, Paper } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.email, formData.password, formData.role);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Paper sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3 }}>
      <Box display="flex" alignItems="center" gap={1}>
        <PersonAddIcon />
        <Typography variant="h5">Register</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          required
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="email"
          name="email"
          fullWidth
          required
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          select
          label="Role"
          name="role"
          fullWidth
          margin="normal"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
