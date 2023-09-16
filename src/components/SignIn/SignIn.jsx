import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { BUTTON_LABELS, ERROR_MESSAGE, FORM_FIELDS } from './constant';

import './SignIn.scss';

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSignIn = async (event) => {
    event.preventDefault();

    try {
      if (
        await signInWithEmailAndPassword(
          auth,
          event.target.email.value,
          event.target.password.value
        )
      ) {
        navigate('home');
      }
    } catch (error) {
      setErrorMessage(ERROR_MESSAGE);
    }
  };

  return (
    <div className='sign-in'>
      <div className='sign-in__main-container'>
        <img
          alt='Company logo'
          className='sign-in__logo'
          src={require('../../img/logo.jpg')}
        />
        <h2 className='sign-in__title'>{FORM_FIELDS.HEADER}</h2>
        <Form className='sign-in__form' onSubmit={onSignIn}>
          <Form.Control
            className='sign-in__email-input'
            name='email'
            placeholder={FORM_FIELDS.EMAIL_INPUT_PlACEHOLDER}
            type='email'
          />
          <Form.Control
            className='sign-in__password-input'
            name='password'
            placeholder={FORM_FIELDS.PASSWORD_INPUT_PlACEHOLDER}
            type='password'
          />
          <div className='sign-in__message-and-ctas-container'>
            <div className='sign-in__message-and-links-container'>
              {errorMessage && (
                <span className='sign-in__error-message'>{errorMessage}</span>
              )}
              <div className='sign-in__links-container'>
                <Link className='sign-in__account-link' to='registration'>
                  {BUTTON_LABELS.SIGN_UP_LABEL}
                </Link>
                <span className='sign-in__delimiter'>·</span>
                <Link className='sign-in__account-link' to='forgot-password'>
                  {BUTTON_LABELS.FORGOT_PASSWORD_LABEL}
                </Link>
              </div>
            </div>
            <Button className='sign-in__sign-in-button' type='submit'>
              {BUTTON_LABELS.SUBMIT_LABEL}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
