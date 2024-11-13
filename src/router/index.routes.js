import { pages } from '../controllers/index';

const content = document.getElementById('root');

const router = async (route) => {
  content.innerHTML = '';

  switch (route) {
    case '#/': {
      return content.appendChild(await pages.home());
    }
    case '#/recetas':
      return content.appendChild(pages.recipes());
    case '#/agg-receta':
      return content.appendChild(pages.addRecipe());
    default:
      return content.appendChild(pages[404]());
  }
};

export { router };
