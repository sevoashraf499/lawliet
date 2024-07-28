import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// mui styles
import {
  Container,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box, // Import Box from Material UI
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated) {
    return <Navigate to="/admin" />; // Ensure Navigate is imported
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://66a5336c5dc27a3c190aea7c.mockapi.io/api/admins"
      );
      const admins = await response.json();
      const admin = admins.find(
        (admin) => admin.username === username && admin.password === password
      );

      if (admin) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/admin");
      } else {
        setShowModal(true); // Show modal on invalid credentials
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 2,
        backgroundColor: "#fff",
      }}
    >
      <form onSubmit={handleLogin}>
        <Typography component="h1" variant="h5">
          Welcome Back 😁
        </Typography>
        <Box sx={{ margin: "8px" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box sx={{ margin: "8px" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box sx={{ margin: "8px" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              "&:hover": {
                backgroundColor: "primary.dark", // Change the background color on hover
                transform: "scale(1.05)", // Slightly scale the button on hover
                transition: "transform 0.5s", // Smooth transition for the scaling effect
              },
            }}
          >
            Login
          </Button>
        </Box>
      </form>

      {/* Material UI Dialog for invalid credentials */}
      <Dialog open={showModal} onClose={handleModalClose}>
        <DialogTitle>
          Login Error
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              right: "8px",
              top: "8px",
              color: "#555",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>Invalid credentials. Please try again.</DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminLoginPage;
