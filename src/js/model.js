import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
import recipeView from './views/recipeView.js';

export const state = {
    recipe: {},
    search: {
        page: 1,
        query: '',
        results: [],
        resultsPerPage: RESULTS_PER_PAGE
    },
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);

        const { recipe } = data.data;
        // console.log(recipe);
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            img: recipe.image_url,
            servings: recipe.servings,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            ingredients: recipe.ingredients,
            cookingTime: recipe.cooking_time,
        };
        // console.log(state.recipe);
    } catch (error) {
        console.error(`Error from model.js in loadRecipe function => ${error}`);
        throw error;
    }
}

export const loadSearchResults = async function (params) {
    try {
        state.search.query = params;
        const data = await getJSON(`${API_URL}?search=${params}`);
        // console.log(data);
        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                img: recipe.image_url,
                publisher: recipe.publisher,
            }
        });
        // console.log(state.search.results);
    } catch (error) {
        console.error(`Error from model.js in loadSearchResults function => ${error}`);
        throw error;
    }
}


export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;

    const start = (page-1)*state.search.resultsPerPage; // 0
    const end = page * state.search.resultsPerPage; // 9

    return state.search.results.slice(start, end);
}