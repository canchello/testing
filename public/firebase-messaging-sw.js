importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'AIzaSyD2mc4t6eOiM8p1Jb4FdF75RBZ9Z-MQ0iY',
  authDomain: 'canchello-application.firebaseapp.com',
  projectId: 'canchello-application',
  storageBucket: 'canchello-application.firebasestorage.app',
  messagingSenderId: '472219984266',
  appId: '1:472219984266:web:bcffa0c6adb34c483ae873',
  measurementId: 'G-XMH4GP80TH'
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

// Handle background notifications
messaging.onBackgroundMessage(payload => {
  console.log('Received background message ', payload)

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Add an icon in the public folder
  })
})
