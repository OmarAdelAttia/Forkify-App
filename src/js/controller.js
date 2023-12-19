const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca5d');
    // const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
    /* console.log(response); */
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    /* if (response.ok) console.log(data); */
    let { recipe } = data.data;
    /* console.log(recipe); */
    recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      servings: recipe.servings,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time
    }
    /* console.log(recipe); */
  } catch (error) {
    alert(error);
  }
}

showRecipe();