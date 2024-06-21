import { createRouter, createWebHistory } from 'vue-router';

// Importamos los componentes de cada una de las vistas de la app
import misEspacios from '../views/misEspacios.vue';
import crearEspacio from '../views/crearEspacio.vue';


// Definimos las rutas de la app
const routes = [
  { path: '/', component: misEspacios },
  { path: '/crearEspacio', component: crearEspacio },
];

// Creamos el enrutador con las rutas definidas y el modo de historial de navegación
const router = createRouter({
  history: createWebHistory(),
  routes, // Estas son las rutas definidas anteriormente
});

// Exportamos del enrutador para su uso en la aplicación
export default router;
