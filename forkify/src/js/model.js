import { async } from 'regenerator-runtime';
import { API_URL, API_KEY, RES_PER_PAGE } from './config';
import { AJAX } from './helpers';

// This will take the recipe, which the controller will get
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  // Formatting naming convention of objects (removing underscores)
  const { recipe } = data.data; // Contains object that holds the recipe list and its related information
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    // will create a key property if the object has a key. if key is null, then it wont create key
    ...(recipe.key && { key: recipe.key }),
  };
};
// Fetching recipe from Forkify API
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

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

    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    // console.log('Query result:', data);

    // Will return a new object
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    // Resetting page number during new searches
    state.search.page = 1;
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

export const updateServings = function (newServings) {
  // Changing property of ingredient object. We will double the servings per quantity.
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  // Overwriting servings after the update
  state.recipe.servings = newServings;
};

// Keep bookmarks in local storage so we don't lose it on page reload
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  /// Add bookmark
  state.bookmarks.push(recipe);

  /// Mark current recipe as bookmarked
  // Adding a new property into the object
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Removing bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

// Loading the bookmarks into the web API upon page reload
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  // Checking if "storage" has contents / do we have bookmarks?
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
