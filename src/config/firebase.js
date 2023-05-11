
import firebase from 'firebase/app'
import 'firebase/firebase-messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyBHeom2jUc35eyf6knMk5thsDQFakceC9g',
  authDomain: 'coflow-2022.firebaseapp.com',
  projectId: 'coflow-2022',
  storageBucket: 'coflow-2022.appspot.com',
  messagingSenderId: '603113695990',
  appId: '1:603113695990:web:4b86207eff37cebfc3dad7',
  measurementId: 'G-DW6RP5RS58'
}
firebase.initializeApp(firebaseConfig)
export default firebase.messaging()
