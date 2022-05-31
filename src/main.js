import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import './assets/fonts/stylesheet.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
const app = createApp(App);
app.use(VueAxios, axios)
app.config.globalProperties.$config = window.stage61config;
app.mount('#stage_61')



