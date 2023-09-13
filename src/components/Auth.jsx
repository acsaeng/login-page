import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signOut as authSignOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = async () => {
    try {
      await authSignOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default Auth;
