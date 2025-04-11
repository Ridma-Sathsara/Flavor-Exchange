import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RecipeForm from '../components/RecipeForm';
import { createRecipe } from '../store/slices/recipeSlice';

function AddRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (formData) => {
    const newRecipe = {
      ...formData,
      id: uuidv4(),
      userId: user.username,
    };
    dispatch(createRecipe(newRecipe));
    navigate('/');
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
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Tooltip title="Back to Home">
            <IconButton
              onClick={() => navigate('/')}
              sx={{ mr: 2, color: 'primary.main' }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              color: 'primary.dark',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <AddIcon /> Create New Recipe
          </Typography>
        </Box>

        {/* Recipe Form */}
        <RecipeForm onSubmit={handleSubmit} />
      </Paper>
    </Box>
  );
}

export default AddRecipe;