import views from '../views/recipes.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = views;

  const recipeList = divElement.querySelector('#recipe-list');

  function loadRecipes() {
    recipeList.innerHTML = ''; // Limpiar recetas previas
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    storedRecipes.forEach((recipe) => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('col-md-4', 'mb-4');
      recipeCard.innerHTML = `
      <div class="card h-100">
        <img src="${recipe.imageUrl}" class="card-img-top" alt="${recipe.name}">
        <div class="card-body">
          <h5 class="card-title">${recipe.name}</h5>
          <p class="card-text"><strong>Ingredientes:</strong> ${recipe.ingredients.join(
            ', '
          )}</p>
          <p class="card-text"><strong>Instrucciones:</strong> ${recipe.instructions.substring(
            0,
            100
          )}...</p>
          <p class="card-text"><small class="text-muted">Tiempo: ${
            recipe.time
          } min</small></p>
          <button class="btn btn-primary btn-edit" data-id="${
            recipe.id
          }">Editar</button>
          <button class="btn btn-danger btn-delete" data-id="${
            recipe.id
          }">Eliminar</button>
        </div>
      </div>
    `;
      recipeList.appendChild(recipeCard);
    });

    // Manejar edición
    const editButtons = recipeList.querySelectorAll('.btn-edit');
    editButtons.forEach((button) =>
      button.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        editRecipe(id);
      })
    );

    // Manejar eliminación
    const deleteButtons = recipeList.querySelectorAll('.btn-delete');
    deleteButtons.forEach((button) =>
      button.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        deleteRecipe(id);
      })
    );
  }

  function editRecipe(id) {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = storedRecipes.find((r) => r.id === Number(id));
    if (recipe) {
      const newName = prompt('Editar nombre:', recipe.name) || recipe.name;
      const newIngredients =
        prompt(
          'editar ingredientes (separados por comas):',
          recipe.ingredients.join(', ')
        ) || recipe.ingredients.join(', ');
      const newTime =
        prompt('Editar tiempo de preparación:', recipe.time) || recipe.time;
      const newInstructions =
        prompt('Editar instrucciones:', recipe.instruction) ||
        recipe.instruction;

      recipe.name = newName;
      recipe.ingredients = newIngredients.split(',').map((i) => i.trim());
      recipe.instruction = newInstructions;

      localStorage.setItem('recipes', JSON.stringify(storedRecipes));
      loadRecipes();
      alert('Receta actualizada correctamente!');
    }
  }

  function deleteRecipe(id) {
    let storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    storedRecipes = storedRecipes.filter((r) => r.id !== Number(id));
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));
    loadRecipes();
    alert('Receta eliminada correctamente!');
  }

  loadRecipes();

  return divElement;
};
