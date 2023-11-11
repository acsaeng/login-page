import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAVG51pWxombEOaUiVdlQkl6uqRta0refQ',
  authDomain: 'login-page-f4b88.firebaseapp.com',
  projectId: 'login-page-f4b88',
  storageBucket: 'login-page-f4b88.appspot.com',
  messagingSenderId: '1098054327316',
  appId: '1:1098054327316:web:b2b63b0894bf2b2a9f1b01',
  measurementId: 'G-RBEDDLS09N',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
