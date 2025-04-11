import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import RecipeForm from '../components/RecipeForm';
import { editRecipe } from '../store/slices/recipeSlice';
import { getRecipeById } from '../utils/mockApi';

function EditRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id)
      .then((data) => setRecipe(data))
      .catch((err) => {
        console.error(err);
        navigate('/'); 
      });
  }, [id, navigate]);

  const handleSubmit = (formData) => {
    dispatch(editRecipe({ id, recipe: { ...formData, id, userId: recipe.userId } }));
    navigate(`/recipe/${id}`);
  };

  if (!recipe) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontFamily: 'Poppins', color: 'text.secondary' }}>
          Loading recipe...
        </Typography>
      </Box>
    );
  }

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
          <Tooltip title="Back to Recipe">
            <IconButton
              onClick={() => navigate(`/recipe/${id}`)}
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
            <EditIcon /> Edit Recipe
          </Typography>
        </Box>

        {/* Recipe Form */}
        <RecipeForm initialData={recipe} onSubmit={handleSubmit} />
      </Paper>
    </Box>
  );
}

export default EditRecipe;