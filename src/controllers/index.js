import Home from './home.controller';
import AddRecipe from './addRecipe.controller';
import Recipes from './recipes.controller';
import Notfound from './404.controller';

const pages = {
  home: Home,
  addRecipe: AddRecipe,
  recipes: Recipes,
  404: Notfound,
};

export { pages };
