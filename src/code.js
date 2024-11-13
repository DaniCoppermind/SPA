import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import('./styles.css');

import { router } from './router/index.routes';

router(window.location.hash);
window.addEventListener('hashchange', () => {
  router(window.location.hash);
});

window.addEventListener('load', () => {
  router(window.location.hash);
})
