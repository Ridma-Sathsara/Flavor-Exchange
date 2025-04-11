import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from '../../utils/mockApi';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const recipes = await getRecipes();
  return recipes;
});

export const createRecipe = createAsyncThunk('recipes/createRecipe', async (recipe) => {
  const newRecipe = await addRecipe(recipe);
  return newRecipe;
});

export const editRecipe = createAsyncThunk('recipes/editRecipe', async ({ id, recipe }) => {
  const updatedRecipe = await updateRecipe(id, recipe);
  return updatedRecipe;
});

export const removeRecipe = createAsyncThunk('recipes/removeRecipe', async (id) => {
  await deleteRecipe(id);
  return id;
});

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    filterRecipes: (state, action) => {
      const query = action.payload.toLowerCase();
      state.recipes = state.recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(query))
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex((r) => r.id === action.payload.id);
        state.recipes[index] = action.payload;
      })
      .addCase(removeRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      });
  },
});

export const { filterRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;