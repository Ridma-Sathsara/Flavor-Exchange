import { INITIAL_RECIPES } from '../constants';

export const getRecipes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipes = JSON.parse(localStorage.getItem('recipes')) || INITIAL_RECIPES;
      resolve(recipes);
    }, 500);
  });
};

export const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const recipes = JSON.parse(localStorage.getItem('recipes')) || INITIAL_RECIPES;
      const recipe = recipes.find((r) => r.id === id);
      if (recipe) {
        resolve(recipe);
      } else {
        reject(new Error('Recipe not found'));
      }
    }, 500);
  });
};

export const addRecipe = (recipe) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipes = JSON.parse(localStorage.getItem('recipes')) || INITIAL_RECIPES;
      recipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      resolve(recipe);
    }, 500);
  });
};

export const updateRecipe = (id, updatedRecipe) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let recipes = JSON.parse(localStorage.getItem('recipes')) || INITIAL_RECIPES;
      recipes = recipes.map((r) => (r.id === id ? updatedRecipe : r));
      localStorage.setItem('recipes', JSON.stringify(recipes));
      resolve(updatedRecipe);
    }, 500);
  });
};

export const deleteRecipe = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let recipes = JSON.parse(localStorage.getItem('recipes')) || INITIAL_RECIPES;
      recipes = recipes.filter((r) => r.id !== id);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      resolve();
    }, 500);
  });
};