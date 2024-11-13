import views from '../views/addRecipe.html';

export default () => {
  const div = document.createElement('div');
  div.innerHTML = views;

  return div;
};
