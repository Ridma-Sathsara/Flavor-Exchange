import { Routes, Route, Navigate, Link } from 'react-router-dom'; // Added Link
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Switch } from '@mui/material';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { logout } from './store/slices/authSlice';

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* Make "Flavor Exchange" clickable and redirect to home */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              cursor: 'pointer', 
              textDecoration: 'none', 
              color: 'inherit', 
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.8)', 
              },
            }}
            component={Link} 
            to="/" 
          >
            Flavor Exchange
          </Typography>
          {user ? (
            <>
              <Typography sx={{ mr: 2 }}>Logged in as {user.username}</Typography>
              <Button color="inherit" href="/add-recipe">
                Add Recipe
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" href="/login">
                Login
              </Button>
              <Button color="inherit" href="/signup">
                Signup
              </Button>
            </>
          )}
          {/* <Switch checked={darkMode} onChange={toggleTheme} /> */}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={user ? <AddRecipe /> : <Navigate to="/login" />} />
        <Route path="/edit-recipe/:id" element={user ? <EditRecipe /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;