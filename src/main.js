import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import { router } from './router'
import clickOutsideDirective from './directives/clickOutsideDirective'
import './style.css'
import App from './App.vue'

// Changes the base URL and specifies that axios should send
// credentials cookies with every request
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

const store = createPinia()
const app = createApp(App)

// Globally activates the click outside directive
app.directive('click-outside', clickOutsideDirective)

app.use(store)
app.use(router)
app.mount('#app')
