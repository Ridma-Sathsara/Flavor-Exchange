import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function RecipeForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    cookingTime: initialData.cookingTime || '',
    rating: initialData.rating || '',
    image: initialData.image || '',
    ingredients: initialData.ingredients?.join(', ') || '',
    instructions: initialData.instructions || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      ingredients: formData.ingredients.split(',').map((ing) => ing.trim()),
      rating: parseFloat(formData.rating),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Cooking Time"
        name="cookingTime"
        value={formData.cookingTime}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Rating"
        name="rating"
        type="number"
        value={formData.rating}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Image URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Ingredients (comma-separated)"
        name="ingredients"
        value={formData.ingredients}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Instructions"
        name="instructions"
        value={formData.instructions}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

export default RecipeForm;