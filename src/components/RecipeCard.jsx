import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { toggleFavorite } from '../store/slices/favoriteSlice';

function RecipeCard({ recipe }) {
  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFavorite = () => {
    dispatch(toggleFavorite(recipe.id));
  };

  return (
    <Card
      sx={{
        width: 300,
        minHeight: 380,
        m: 2,
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)',
        },
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Recipe Image */}
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <CardMedia
          component="img"
          height="180"
          image={recipe.image}
          alt={recipe.title}
          sx={{
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
            '&:hover': { opacity: 0.85 },
          }}
        />
        {/* Rating Chip Overlay */}
        <Chip
          label={`⭐ ${recipe.rating}`}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(80, 158, 47, 0.9)',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          p: 3,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Title and Cooking Time */}
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'primary.dark',
              mb: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontFamily: 'Poppins',
              fontSize: '1.2rem',
            }}
          >
            {recipe.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <span role="img" aria-label="clock">⏳</span>
            {recipe.cookingTime}
          </Typography>
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
          }}
        >
          {/* View Details Button */}
          <Tooltip title="View Details">
            <IconButton
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              sx={{
                color: 'primary.main',
                backgroundColor: 'rgba(80, 158, 47, 0.1)',
                '&:hover': { 
                  color: 'primary.dark',
                  backgroundColor: 'rgba(80, 158, 47, 0.2)',
                },
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          {/* Favorite Button */}
          {user && (
            <Tooltip title={favorites.includes(recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}>
              <IconButton
                onClick={handleFavorite}
                sx={{
                  color: favorites.includes(recipe.id) ? 'error.main' : 'grey.600',
                  backgroundColor: favorites.includes(recipe.id) ? 'rgba(220, 0, 78, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    color: favorites.includes(recipe.id) ? 'error.dark' : 'grey.800',
                    backgroundColor: favorites.includes(recipe.id) ? 'rgba(220, 0, 78, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;