import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

// This will take the recipe, which the controller will get
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

// Fetching recipe from Forkify API
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // Formatting naming convention of objects (removing underscores)
    const { recipe } = data.data; // Contains object that holds the recipe list and its related information
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log('Recipe object after formatting:', state.recipe);
  } catch (err) {
    console.error(`${err} 🤩🤩🤩`);
    throw err;
  }
};

// Get all recipes
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log('Query result:', data);

    // Will return a new object
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 🤩🤩🤩`);
    throw err;
  }
};
// loadSearchResults('pizza');

// Returns part of the results - for pagination
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; //9;
  return state.search.results.slice(start, end);
};
