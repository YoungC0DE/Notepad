import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@/assets/all.css'
import 'vue-toast-notification/dist/theme-default.css'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
}

const app = createApp(App)
const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)

app.provide('db', db)
app.use(router)
app.use(ToastPlugin)

app.mount('#app')
