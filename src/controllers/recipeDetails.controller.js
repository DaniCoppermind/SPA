import views from '../views/recipeDetails.html';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

async function getRecipeId(id) {
  const response = await fetch(`${BASE_URL}${id}`);
  const data = await response.json();
  return data.meals[0];
}

function formatInstructions(instructions) {
  // Split instructions into steps
  let steps = instructions.split(/\n(?=STEP|\d+\.)/);

  // If no explicit steps, split by sentences
  if (steps.length <= 1) {
    steps = instructions.match(/[^\.!\?]+[\.!\?]+/g) || [instructions];
  }

  return steps
    .map(
      (step, index) => `
    <div class="accordion-item">
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button ${
          index === 0 ? '' : 'collapsed'
        }" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${
        index === 0 ? 'true' : 'false'
      }" aria-controls="collapse${index}">
          Paso ${index + 1}
        </button>
      </h2>
      <div id="collapse${index}" class="accordion-collapse collapse ${
        index === 0 ? 'show' : ''
      }" aria-labelledby="heading${index}" data-bs-parent="#instructionsAccordion">
        <div class="accordion-body">
          ${step.trim()}
        </div>
      </div>
    </div>
  `
    )
    .join('');
}

export default async (id) => {
  const divElement = document.createElement('div');
  divElement.innerHTML = views;

  const recipeDetailElement = divElement.querySelector('#recipe-detail');
  const recipe = await getRecipeId(id);

  recipeDetailElement.innerHTML = `
<div class="container mt-4">
  <div class="card shadow-sm">
    <div class="card-header p-0 position-relative">
      <img src="${recipe.strMealThumb}" class="card-img-top img-fluid" alt="${
    recipe.strMeal
  }" style="max-height: 300px; object-fit: cover;">
      <div class="position-absolute bottom-0 start-0 w-100 p-3 bg-dark bg-opacity-50">
        <h2 class="text-white mb-0">${recipe.strMeal}</h2>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <h5 class="card-title">
            <i class="bi bi-list-ul me-2"></i>Ingredientes:
          </h5>
          <ul class="list-group list-group-flush">
            ${Object.keys(recipe)
              .filter((key) => key.startsWith('strIngredient') && recipe[key])
              .map(
                (key) => `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span>${recipe[key]}</span>
                  <span class="badge bg-primary rounded-pill">${
                    recipe['strMeasure' + key.slice(13)]
                  }</span>
                </li>
              `
              )
              .join('')}
          </ul>
        </div>
        <div class="col-md-6 mt-3 mt-md-0">
          <h5 class="card-title">
            <i class="bi bi-file-text me-2"></i>Instrucciones:
          </h5>
          <div class="accordion" id="instructionsAccordion">
            ${formatInstructions(recipe.strInstructions)}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;

  return divElement;
};
