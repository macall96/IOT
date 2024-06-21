import { createRouter, createWebHistory } from 'vue-router';
import controladorDispositivo from '@/views/controladorDispositivo.vue';


// Definimos de las rutas de la app
const routes = [
  {
    path: '/:id',
    component: controladorDispositivo
  },

]

// Creamos el enrutador con las rutas definidas y el modo de historial de navegación
export const router = createRouter({
  history: createWebHistory(),
  routes, 
});

// Exportamos del enrutador para su uso en la aplicación
export default router;
