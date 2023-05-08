importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyBHeom2jUc35eyf6knMk5thsDQFakceC9g',
  authDomain: 'coflow-2022.firebaseapp.com',
  projectId: 'coflow-2022',
  storageBucket: 'coflow-2022.appspot.com',
  messagingSenderId: '603113695990',
  appId: '1:603113695990:web:4b86207eff37cebfc3dad7',
  measurementId: 'G-DW6RP5RS58'
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
