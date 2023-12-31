import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
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
        console.error(error);
    }
}