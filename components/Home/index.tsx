import React, { FC } from 'react';
import styles from './styles.module.scss';
import Button from '../Button';
import { useDispatch } from 'react-redux';

export interface HomeProps {
  
}

export const Home: FC<HomeProps> = () => {
  const dispatch = useDispatch();

  const authenticateUser = () => {
    console.log('hit');
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.header}>
        Rob Chess
      </h1>
      <Button
        className={styles.guestButton}
        link={'/play'}
      >
        Continue As Guest
      </Button>
      <Button
        className={styles.signinButton}
        onClick={authenticateUser}
      >
        Sign in
      </Button>
      <Button
        className={styles.aiButton}
        link={'/ai'}
      >
        Play AI
      </Button>
    </div>
  );
};

export default Home;
