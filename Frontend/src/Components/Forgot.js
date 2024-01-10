import React from 'react';
import { Container, CssBaseline, TextField, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Forgot = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic for handling the forgot password functionality here
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
            mt: 3,
            mb: 2,
            bgcolor: '#FFC107',
            '&:hover': {
            bgcolor: '#FFD700', // Change the color for hover state
            },
            }}
            >
            Send Reset Link
          </Button>
        </form>
        <Typography component="div" style={{ marginTop: '1rem' }}>
          <Link to="/signin" variant="body2">
            Back to Sign In
          </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default Forgot;
