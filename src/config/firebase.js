import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJqSM52h856b5ZekT_hn7Lx3chpLxr8p8',
  authDomain: 'login-page-93c09.firebaseapp.com',
  projectId: 'login-page-93c09',
  storageBucket: 'login-page-93c09.appspot.com',
  messagingSenderId: '444395485771',
  appId: '1:444395485771:web:6683e0aeb26e2b2ed0abce',
  measurementId: 'G-8GRHGMNB4Z',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
