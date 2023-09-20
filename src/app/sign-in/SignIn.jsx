'use client';

import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
import CompanyLogo from '../../img/logo.jpg';
import { BUTTON_LABELS, ERROR_MESSAGE, FORM_FIELDS } from './constants';

import './SignIn.scss';

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const route = useRouter();

  useRouter;

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
        route.push('/home');
      }
    } catch (error) {
      setErrorMessage(ERROR_MESSAGE);
    }
  };

  return (
    <div className='sign-in'>
      <div className='sign-in__main-container'>
        <Image
          alt='Company logo'
          className='sign-in__logo'
          placeholder='blur'
          quality={100}
          src={CompanyLogo}
        />
        <h2 className='sign-in__title'>{FORM_FIELDS.HEADER}</h2>
        <Form className='sign-in__form' onSubmit={onSignIn}>
          <Form.Control
            className='sign-in__email-input'
            name='email'
            onChange={() => setErrorMessage('')}
            placeholder={FORM_FIELDS.EMAIL_INPUT_PlACEHOLDER}
            type='email'
          />
          <Form.Control
            className='sign-in__password-input'
            name='password'
            onChange={() => setErrorMessage('')}
            placeholder={FORM_FIELDS.PASSWORD_INPUT_PlACEHOLDER}
            type='password'
          />
          <div className='sign-in__message-and-ctas-container'>
            <div className='sign-in__message-and-links-container'>
              {errorMessage && (
                <span className='sign-in__error-message'>{errorMessage}</span>
              )}
              <div className='sign-in__links-container'>
                <Link className='sign-in__account-link' href='/registration'>
                  {BUTTON_LABELS.SIGN_UP_LABEL}
                </Link>
                <span className='sign-in__delimiter'>·</span>
                <Link className='sign-in__account-link' href='/forgot-password'>
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
