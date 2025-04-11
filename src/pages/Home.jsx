import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  Paper,
  Fade,
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ErrorIcon from '@mui/icons-material/Error';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { fetchRecipes } from '../store/slices/recipeSlice';


function Home() {
  const { recipes, status, error } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw', 
        background: 'linear-gradient(135deg, #e0f2e9 0%, #f5f5dc 100%)',        
        px: { xs: 2, sm: 3, md: 4 }, 
        boxSizing: 'border-box',
        paddingTop: 4,
        paddingBottom: 4,
        
        
      }}
    >
      {/* Header Section */}
      <Fade in timeout={1000}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%), url('https://images.unsplash.com/photo-1577303935007-0d306ee638cf?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            mx: 'auto',
            maxWidth: '100%', 
            minHeight: { xs: 200, sm: 250, md: 300 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RestaurantMenuIcon sx={{ fontSize: 40, color: 'white', mr: 2 }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: 1,
                fontFamily: 'Poppins',
              }}
            >
              Discover Delicious Recipes
            </Typography>
          </Box>
          <Box sx={{ mt: { xs: 2, md: 0 }, width: { xs: '100%', md: '40%' } }}>
            <SearchBar />
          </Box>
        </Paper>
      </Fade>

      {/* Content Section */}
      {status === 'loading' && (
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <CircularProgress size={60} sx={{ color: 'secondary.main' }} />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            Loading recipes...
          </Typography>
        </Box>
      )}

      {status === 'failed' && (
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <ErrorIcon sx={{ fontSize: 60, color: 'error.main' }} />
          <Typography variant="h5" sx={{ mt: 2, color: 'error.main' }}>
            {error}
          </Typography>
        </Box>
      )}

      {status === 'succeeded' && (
        <Fade in timeout={500}>
          <Grid container spacing={3}>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Grid
                  item
                  xs={12} 
                  sm={6}  
                  md={4}  
                  lg={3}  
                  xl={2}  
                  key={recipe.id}
                >
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', width: '100%', my: 8 }}>
                <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                  No recipes found. Try a different search!
                </Typography>
              </Box>
            )}
          </Grid>
        </Fade>
      )}
    </Box>
  );
}

export default Home;