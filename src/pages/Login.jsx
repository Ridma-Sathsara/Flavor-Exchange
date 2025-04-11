import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { login } from '../store/slices/authSlice';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username] && users[username].password === password) {
      dispatch(login({ username }));
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        px: { xs: 2, sm: 3, md: 4 },
        py: 4,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: '400px',
          width: '100%',
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Header Section */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            color: 'primary.dark',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
            textAlign: 'center',
          }}
        >
          <LoginIcon /> Log In
        </Typography>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': { fontFamily: 'Roboto' },
              '& .MuiInputBase-input': { fontFamily: 'Roboto' },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': { fontFamily: 'Roboto' },
              '& .MuiInputBase-input': { fontFamily: 'Roboto' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontFamily: 'Roboto',
              fontWeight: 500,
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Log In
          </Button>
        </Box>

        {/* Link to Signup */}
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            textAlign: 'center',
            fontFamily: 'Roboto',
            color: 'text.secondary',
          }}
        >
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;