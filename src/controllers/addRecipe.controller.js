import views from '../views/addRecipe.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = views;

  const form = divElement.querySelector('#recipe-form');

  // Handle form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // data Form
    const name = form.querySelector('#name').value;
    const ingredients = form.querySelector('#ingredients').value.split(',');
    const time = form.querySelector('#time').value;
    const instructions = form.querySelector('#instructions').value;
    const imageUrl = form.querySelector('#image').value;

    // Validate URL img
    const imageRegex = /\.(jpeg|jpg|png|gif)$/i;
    if (!imageRegex.test(imageUrl)) {
      alert('La URL de la imagen debe ser válida.');
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name,
      ingredients,
      time,
      instructions,
      imageUrl,
    };

    // Add new recipe to local storage
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    storedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));

    form.reset();

    alert('Receta agregada correctamente!');
  });

  return divElement;
};
