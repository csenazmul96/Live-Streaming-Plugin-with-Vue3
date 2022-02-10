import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import './assets/fonts/stylesheet.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
fetch("/stage61_config.json")
    .then((response) => response.json())
    .then((config) => {
        const app = createApp(App);
        app.use(VueAxios, axios)
        app.config.globalProperties.$config = config;
        app.mount('#stage_61')
    })


