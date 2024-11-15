import './assets/main.css'

import { createApp } from 'vue'
//pinia
import { createPinia, setActivePinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useBookStore } from './piniaStores/book.store';
//element plus
import ElementPlus from'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue';
import router from './router/index.js'

const pinia = createPinia()
const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
// setActivePinia(pinia)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

const bookStore = useBookStore()
app.use(router)
if(!bookStore.fetching) { 
  bookStore.getAll()
}
app.mount('#app') 
