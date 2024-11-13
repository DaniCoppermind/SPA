import { pages } from '../controllers/index';

const content = document.getElementById('root');

const router = async (route) => {
  const hash = route.slice(1).toLowerCase() || '/';
  const routeParts = hash.split('/');
  const param = routeParts[2] || null;

  if (param) {
    content.innerHTML = '';
    return content.appendChild(await pages.recipeDetails(param));
  }

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
