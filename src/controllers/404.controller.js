import views from '../views/404.html';

export default () => {
  const div = document.createElement('div');
  div.innerHTML = views;

  return div;
};
