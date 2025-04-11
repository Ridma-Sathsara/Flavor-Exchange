import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipeId = action.payload;
      if (state.favorites.includes(recipeId)) {
        state.favorites = state.favorites.filter((id) => id !== recipeId);
      } else {
        state.favorites.push(recipeId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;