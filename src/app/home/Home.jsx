'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Container, Navbar } from 'react-bootstrap';
import { signOutUser } from '@/utils/auth';
import PAGE from '@/common/routes';

import './Home.scss';

const Home = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const onSignOut = async () => {
    await signOutUser();
    router.push(PAGE.SIGN_IN);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthorized(true);
      } else {
        router.push(PAGE.NOT_FOUND);
      }
    });
  }, []);

  return (
    <>
      {isAuthorized && (
        <div className='home'>
          <Navbar className='home__navbar'>
            <Container>
              <Navbar.Brand href={PAGE.HOME}>Company name</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className='home__navbar-collapse'>
                <Navbar.Text>
                  <Link href={PAGE.SIGN_IN} onClick={() => onSignOut()}>
                    Sign out
                  </Link>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default Home;
