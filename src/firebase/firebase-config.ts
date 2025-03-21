import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyD2mc4t6eOiM8p1Jb4FdF75RBZ9Z-MQ0iY',
  authDomain: 'canchello-application.firebaseapp.com',
  projectId: 'canchello-application',
  storageBucket: 'canchello-application.firebasestorage.app',
  messagingSenderId: '472219984266',
  appId: '1:472219984266:web:bcffa0c6adb34c483ae873',
  measurementId: 'G-XMH4GP80TH'
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export { messaging, getToken, onMessage }
