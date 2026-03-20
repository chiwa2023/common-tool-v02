import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);
app.use(router); 
app.mount('#app');

// pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
