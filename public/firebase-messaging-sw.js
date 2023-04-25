importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyDfiemmxtHtPUtdzJ0rwvX2upH-VxPAgJg',
  authDomain: 'coflow-45a6f.firebaseapp.com',
  projectId: 'coflow-45a6f',
  storageBucket: 'coflow-45a6f.appspot.com',
  messagingSenderId: '319699081416',
  appId: '1:319699081416:web:186b2d43e59a8fdf48adfd',
  measurementId: 'G-56ZECC3JSJ'
}
// const app = firebase.initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  self.registration.showNotification(notificationTitle,
    notificationOptions)
})
// app.messaging().getToken({ vapidKey: 'BJd0e9hbVksQwvFstS4nkapVyHMFMtdqV0Lf2s1nqnSZhp2LjL14S-abrNI9ivR8I33TdSRbAUyUCeDlD5w2gqM' }).then((currentToken) => {
//   console.log('cu')
//   if (currentToken) {
//     console.log('client token', currentToken)
//   } else {
//     console.log('No registration token available. Request permission to generate one.')
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err)
// })
