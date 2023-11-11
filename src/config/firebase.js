import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Add your Firebase SDK configuration parameters here
const firebaseConfig = {};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
