import views from '../views/home.html';
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

async function getRecipes() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

function renderRecipes(recipes, container) {
  container.innerHTML = '';

  recipes.forEach((recipe) => {
    const { strMeal, strMealThumb, strInstructions } = recipe;

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('col-md-4', 'mb-4');
    recipeCard.innerHTML = `
      <div class="card h-100">
        <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}">
        <div class="card-body">
          <h5 class="card-title">${strMeal}</h5>
          <p class="card-text">${strInstructions.substring(0, 100)}...</p>
          <button class="btn btn-primary">Ver Más</button>
        </div>
      </div>
    `;

    container.appendChild(recipeCard);
  });
}

export default async () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = views;

  const recipesElement = divElement.querySelector('#recipe-list');

  const recipesData = await getRecipes();
  renderRecipes(recipesData.meals, recipesElement);

  return divElement;
};
