import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import { createPinia } from "pinia";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'vue-toast-notification/dist/theme-default.css';
import '@/assets/sass/index.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
