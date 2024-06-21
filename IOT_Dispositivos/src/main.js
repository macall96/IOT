import '@/assets/main.css'
import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

createApp(App).use(router).mount('#app');

