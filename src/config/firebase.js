
import firebase from 'firebase/app'
import 'firebase/firebase-messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDfiemmxtHtPUtdzJ0rwvX2upH-VxPAgJg',
  authDomain: 'coflow-45a6f.firebaseapp.com',
  projectId: 'coflow-45a6f',
  storageBucket: 'coflow-45a6f.appspot.com',
  messagingSenderId: '319699081416',
  appId: '1:319699081416:web:186b2d43e59a8fdf48adfd',
  measurementId: 'G-56ZECC3JSJ'
}
firebase.initializeApp(firebaseConfig)
export default firebase.messaging()
