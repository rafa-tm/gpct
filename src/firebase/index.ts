import { initializeApp } from 'firebase/app';
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCw6nPdS-mrOosy0EIcOvvvgDLcUBryBlA',
  authDomain: 'gpct-extencion.firebaseapp.com',
  projectId: 'gpct-extencion',
  storageBucket: 'gpct-extencion.appspot.com',
  messagingSenderId: '405760132683',
  appId: '1:405760132683:web:222998e679519c4f89afce',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);

// Export Firebase Store
export const db = getFirestore(app);
