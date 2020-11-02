import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { reset } from '../../redux/board';

export interface HomeProps {
  
}

export const Home: FC<HomeProps> = () => {
  const dispatch = useDispatch();

  const authenticateUser = () => {
    console.log('hit');
  };

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

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
        className={styles.guestButton}
        link={'/chuess'}
      >
        Play Chuess
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
