import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  Box,
  List,
  ListItem,
  CircularProgress,
  Paper,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ListIcon from '@mui/icons-material/List';
import CookingTimer from '../components/CookingTimer';
import { toggleFavorite } from '../store/slices/favoriteSlice';
import { removeRecipe } from '../store/slices/recipeSlice';
import { getRecipeById } from '../utils/mockApi';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites.favorites);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const shareMenuOpen = Boolean(shareAnchorEl);

  useEffect(() => {
    getRecipeById(id)
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleFavorite = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavorite(recipe.id));
  };

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.id}`);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    dispatch(removeRecipe(recipe.id));
    navigate('/');
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleShareClick = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  const shareRecipe = (platform) => {
    const recipeUrl = `${window.location.origin}/recipe/${id}`;
    const shareText = `Check out this delicious recipe: ${recipe.title}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(recipeUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${recipeUrl}`)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${recipeUrl}`)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n${recipeUrl}`);
       
        break;
      default:
        break;
    }
    handleShareClose();
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={60} sx={{ color: 'secondary.main' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5" color="error" sx={{ fontFamily: 'Poppins' }}>
          {error}
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
          maxWidth: '1200px',
          mx: 'auto',
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Image */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '50%' } }}>
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>

          {/* Title and Metadata */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                color: 'primary.dark',
                mb: 2,
              }}
            >
              {recipe.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                icon={<AccessTimeIcon />}
                label={`Cooking Time: ${recipe.cookingTime}`}
                sx={{
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  fontFamily: 'Roboto',
                }}
              />
              <Chip
                icon={<StarIcon />}
                label={`Rating: ${recipe.rating}`}
                sx={{
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  fontFamily: 'Roboto',
                }}
              />
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
              {user && (
                <Button
                  variant="contained"
                  startIcon={<FavoriteIcon />}
                  onClick={handleFavorite}
                  sx={{
                    backgroundColor: favorites.includes(recipe.id) ? 'error.main' : 'primary.main',
                    '&:hover': {
                      backgroundColor: favorites.includes(recipe.id) ? 'error.dark' : 'primary.dark',
                    },
                  }}
                >
                  {favorites.includes(recipe.id) ? 'Remove from Favorites' : 'Save to Favorites'}
                </Button>
              )}
              
              {/* Share Button */}
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={handleShareClick}
                sx={{
                  borderColor: 'info.main',
                  color: 'info.main',
                  '&:hover': {
                    borderColor: 'info.dark',
                    backgroundColor: 'rgba(0, 184, 212, 0.08)',
                  },
                }}
              >
                Share
              </Button>
              
              {/* Edit/Delete Buttons  */}
              {user && user.username === recipe.userId && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        backgroundColor: 'primary.light',
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                    sx={{
                      borderColor: 'error.main',
                      color: 'error.main',
                      '&:hover': {
                        borderColor: 'error.dark',
                        backgroundColor: 'rgba(244, 67, 54, 0.08)',
                      },
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* Share Menu */}
        <Menu
          anchorEl={shareAnchorEl}
          open={shareMenuOpen}
          onClose={handleShareClose}
        >
          <MenuItem onClick={() => shareRecipe('facebook')}>
            <ListItemIcon>
              <FacebookIcon color="primary" />
            </ListItemIcon>
            <Typography variant="inherit">Facebook</Typography>
          </MenuItem>
          <MenuItem onClick={() => shareRecipe('twitter')}>
            <ListItemIcon>
              <TwitterIcon color="info" />
            </ListItemIcon>
            <Typography variant="inherit">Twitter</Typography>
          </MenuItem>
          <MenuItem onClick={() => shareRecipe('whatsapp')}>
            <ListItemIcon>
              <WhatsAppIcon color="success" />
            </ListItemIcon>
            <Typography variant="inherit">WhatsApp</Typography>
          </MenuItem>
          <MenuItem onClick={() => shareRecipe('email')}>
            <ListItemIcon>
              <EmailIcon color="action" />
            </ListItemIcon>
            <Typography variant="inherit">Email</Typography>
          </MenuItem>
          <MenuItem onClick={() => shareRecipe('copy')}>
            <ListItemIcon>
              <LinkIcon color="secondary" />
            </ListItemIcon>
            <Typography variant="inherit">Copy Link</Typography>
          </MenuItem>
        </Menu>

        {/* Rest of the component */}
        <Divider sx={{ my: 4 }} />

        {/* Ingredients Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <RestaurantIcon /> Ingredients
          </Typography>
          <List sx={{ pl: 2 }}>
            {recipe.ingredients.map((ing, index) => (
              <ListItem
                key={index}
                sx={{
                  fontFamily: 'Roboto',
                  color: 'text.primary',
                  py: 0.5,
                  '&::before': {
                    content: '"•"',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    width: '1em',
                    marginLeft: '-1em',
                  },
                }}
              >
                {ing}
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Instructions Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <ListIcon /> Instructions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Roboto',
              color: 'text.primary',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
            }}
          >
            {recipe.instructions}
          </Typography>
        </Box>

        {/* Cooking Timer */}
        <CookingTimer cookingTime={recipe.cookingTime.split(' ')[0]} />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Recipe?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{recipe?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button 
            onClick={confirmDelete} 
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RecipeDetails;