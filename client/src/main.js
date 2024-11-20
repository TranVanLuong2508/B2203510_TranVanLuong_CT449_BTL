// import './assets/main.css'

import { createApp } from 'vue'
//pinia
import { createPinia, setActivePinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
//element plus
import ElementPlus from'element-plus'
import 'element-plus/dist/index.css'
import './assets/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue';
import router from './router/index.js'

//import AOS
import Aos from 'aos';
import 'aos/dist/aos'
import 'aos/dist/aos.css'
const pinia = createPinia()
const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(router)
app.mount('#app') 
Aos.init();