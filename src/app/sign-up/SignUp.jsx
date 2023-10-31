'use client';

import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Form, Modal } from 'react-bootstrap';
import PAGE from '@/common/routes';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_MESSAGES,
  FORM_STATUS,
  MODAL_LABELS,
} from './constants';

import './SignUp.scss';

const SignUp = () => {
  const [formStatus, setFormStatus] = useState(FORM_STATUS.PENDING);
  const route = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        event.target.email.value,
        event.target.password.value
      );
      await sendEmailVerification(auth.currentUser);
      console.log('current user', auth.currentUser);
      setFormStatus(FORM_STATUS.SUCCESS);
    } catch (error) {
      setFormStatus(FORM_STATUS.ERROR);
    }
  };

  return (
    <div className='sign-up'>
      <div className='sign-up__container'>
        <Link className='sign-up__back-button' href={PAGE.SIGN_IN}>
          {FORM_LABELS.BACK_LINK}
        </Link>
        <h6 className='sign-up__header'>{FORM_LABELS.FORM_HEADER}</h6>
        <Form className='sign-up__form' onSubmit={onSubmit}>
          <div className='sign-up__name-inputs-container'>
            <Form.Control
              className='sign-up__first-name-input'
              maxLength={FORM_FIELDS.FIRST_NAME.maxLength}
              name={FORM_FIELDS.FIRST_NAME.name}
              onChange={() => setFormStatus(FORM_STATUS.PENDING)}
              placeholder={FORM_FIELDS.FIRST_NAME.label}
              required
            />
            <Form.Control
              className='sign-up__last-name-input'
              maxLength={FORM_FIELDS.LAST_NAME.maxLength}
              name={FORM_FIELDS.LAST_NAME.name}
              onChange={() => setFormStatus(FORM_STATUS.PENDING)}
              placeholder={FORM_FIELDS.LAST_NAME.label}
              required
            />
          </div>
          <Form.Control
            className='sign-up__email-input'
            maxLength={FORM_FIELDS.EMAIL.maxLength}
            name={FORM_FIELDS.EMAIL.name}
            onChange={() => setFormStatus(FORM_STATUS.PENDING)}
            placeholder={FORM_FIELDS.EMAIL.label}
            required
            type={FORM_FIELDS.EMAIL.type}
          />
          <Form.Control
            className='sign-up__password-input'
            name={FORM_FIELDS.PASSWORD.name}
            onChange={() => setFormStatus(FORM_STATUS.PENDING)}
            // pattern={FORM_FIELDS.PASSWORD.pattern}
            title={FORM_FIELDS.PASSWORD.title}
            placeholder={FORM_FIELDS.PASSWORD.label}
            required
            type={FORM_FIELDS.PASSWORD.type}
          />
          <Form.Control
            className='sign-up__dob-input'
            name={FORM_FIELDS.DOB.name}
            onChange={() => setFormStatus(FORM_STATUS.PENDING)}
            placeholder={FORM_FIELDS.DOB.label}
            required
            type={FORM_FIELDS.DOB.type}
          />
          <Form.Select
            className='sign-up__gender-input'
            name={FORM_FIELDS.GENDER.name}
            onChange={() => setFormStatus(FORM_STATUS.PENDING)}
            placeholder={FORM_FIELDS.GENDER.label}
            required
          >
            {FORM_FIELDS.GENDER.options.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </Form.Select>
          <div className='sign-up__message-and-submit-container'>
            {formStatus === FORM_STATUS.ERROR && (
              <span className='sign-up__error-message'>
                {FORM_MESSAGES.ERROR_MESSAGE}
              </span>
            )}
            <Button
              className='sign-up__submit-button'
              disabled={formStatus !== FORM_STATUS.PENDING}
              type='submit'
            >
              {FORM_LABELS.SUBMIT_BUTTON}
            </Button>
          </div>
        </Form>
      </div>
      <Modal
        backdrop='static'
        className='sign-up__success-modal'
        centered
        show={formStatus === FORM_STATUS.SUCCESS}
      >
        <Modal.Header>
          <Modal.Title>{MODAL_LABELS.TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{MODAL_LABELS.BODY}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => route.push(PAGE.SIGN_IN)}>
            {MODAL_LABELS.BUTTON}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
