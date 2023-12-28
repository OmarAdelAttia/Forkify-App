export const state = {
    recipe: {},
};

export const loadRecipe = async function (id) {
    try {
        const response = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        // const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
        // console.log(response);
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        /* if (response.ok) console.log(data); */
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
        alert(error);
    }
}