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
        className={styles.chessButton}
        link={'/chess'}
      >
        Play Chess
      </Button>
      <Button
        className={styles.aiButton}
        link={'/ai'}
      >
        Play Chess AI
      </Button>
      <Button
        className={styles.chuessButton}
        link={'/chuess'}
      >
        Play Chuess
      </Button>
      <Button
        className={styles.chuessAIButton}
        link={'/chuess-ai'}
      >
        Play Chuess AI
      </Button>
    </div>
  );
};

export default Home;
