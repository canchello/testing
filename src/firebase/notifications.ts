import { messaging, getToken, onMessage } from './firebase-config'

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BOyWYYCzX03ONrpJCNHnCuMpkBMVkf6rWm_hFhvlgUEZ3SUIK9VPv2HgwmbArxplf_3alSz5gEPD_RzQs7jrXIw' // Get this from Firebase Cloud Messaging settings
      })
      console.log('FCM Token:', token)
      return token
    } else {
      console.log('Permission denied')
    }
  } catch (error) {
    console.error('Error getting permission:', error)
  }
}

export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      console.log('Foreground Notification:', payload)
      resolve(payload)
    })
  })
