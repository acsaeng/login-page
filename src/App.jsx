import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import ForgotPassword from './components/ForgotPassword';
import Registration from './components/Registration';
import Home from './components/Home';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to='sign-in' />} />
        <Route path='sign-in'>
          <Route element={<SignIn />} index />
          <Route element={<ForgotPassword />} path='forgot-password' />
          <Route element={<Registration />} path='registration' />
        </Route>
      </Route>
      <Route element={<Home />} path='home' />
    </Routes>
  );
};

export default App;
