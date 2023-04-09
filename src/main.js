import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/all.css'
import 'vue-toast-notification/dist/theme-default.css'

const app = createApp(App)

app.use(router)
app.use(ToastPlugin)

app.mount('#app')
