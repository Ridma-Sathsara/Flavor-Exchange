import { useDispatch } from 'react-redux';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import { filterRecipes } from '../store/slices/recipeSlice';

function SearchBar() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(filterRecipes(e.target.value));
  };

  return (
    <TextField
      fullWidth
      label="Search by title or ingredient"
      variant="outlined"
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'white' }} /> 
          </InputAdornment>
        ),
      }}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(8px)', 
          borderColor: 'white', 
          color: 'white', 
          transition: 'all 0.3s ease', 
          '&:hover': {
            transform: 'scale(1.02)', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', 
          },
          '& fieldset': {
            borderColor: 'white', 
          },
          '&:hover fieldset': {
            borderColor: 'white', 
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', 
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)', 
          },
        },
        '& .MuiInputLabel-root': {
          color: 'white', 
          fontFamily: 'Roboto',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'white', 
        },
      }}
    />
  );
}

export default SearchBar;