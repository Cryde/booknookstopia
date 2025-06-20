import { createApp } from 'vue';
import '../style/style.css';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import Aura from '@primeuix/themes/aura';
import router from './router/index.js';
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';

const pinia = createPinia()
const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-mode',
        }
    }
});
app.use(pinia);
app.use(router);
app.use(ToastService);
app.mount('#app');

import.meta.glob([
    '../images/**',
]);
