'use client';

import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import CompanyLogo from '../../img/logo.jpg';
import { BUTTON_LABELS, FORM_FIELDS, FORM_MESSAGES } from './constants';

import './ForgotPassword.scss';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, event.target.email.value);
      setError(false);
      setMessage(FORM_MESSAGES.EMAIL_CONFIRMATION_SUCCESS_MESSAGE);
    } catch (error) {
      setError(true);
      setMessage(FORM_MESSAGES.ERROR_MESSAGE);
    }
  };

  return (
    <div className='forgot-password'>
      <div className='forgot-password__main-container'>
        <Link className='forgot-password__back-button' href='/'>
          {BUTTON_LABELS.BACK_LABEL}
        </Link>
        <Image
          alt='Company logo'
          className='forgot-password__logo'
          placeholder='blur'
          quality={100}
          src={CompanyLogo}
        />
        <h6 className='forgot-password__header'>{FORM_FIELDS.HEADER}</h6>
        <Form className='forgot-password__form' onSubmit={onSubmit}>
          <Form.Control
            className='forgot-password__email-input'
            name='email'
            placeholder={FORM_FIELDS.EMAIL_INPUT_PlACEHOLDER}
            type='email'
          />
          <div className='forgot-password__message-and-submit-container'>
            {message && (
              <span
                className={`forgot-password__message forgot-password__message--${
                  !error ? 'success' : 'error'
                }`}
              >
                {message}
              </span>
            )}
            <Button
              className='forgot-password__submit-button'
              disabled={!error && message}
              type='submit'
            >
              {BUTTON_LABELS.SUBMIT_LABEL}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
