// import icons from '../img/icons.svg'; // Parcel 1
// get the icons since we are using Parcel and it takes the icons from the dist
import icons from 'url:../img/icons.svg'; // Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
console.log(icons);

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

const renderSpinner = function (parentElement) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `
  // setting innerHTML into nothing
  parentElement.insertAdjacentHTML = '';
  // setting the spinner to see it while loading
  parentElement.insertAdjacentHTML('afterbegin', markup);
}

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    // using guard
    if (!id) return;
    // if (!id) throw new Error("No ID found");

    // 1) loading the recipe
    renderSpinner(recipeContainer);
    // 2) loading the
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
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
      img: recipe.image_url,
      servings: recipe.servings,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
    };
    /* console.log(recipe); */

    const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.img}" alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">

        ${recipe.ingredients.map(ingredient => {
      return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ingredient.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ingredient.unit}</span>
              ${ingredient.description}
            </div>
          </li>
          `;
    }).join(' ')};
        
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;

    // get rid of the old HTML (static one)
    recipeContainer.innerHTML = '';
    // insert new HTML (dynamic one)
    recipeContainer.insertAdjacentHTML('afterbegin', markup);

  } catch (error) {
    alert(error);
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, showRecipe));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);