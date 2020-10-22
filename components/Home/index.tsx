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
      <Button
        link={'/play'}
      >
        Continue As Guest
      </Button>
      <Button
        onClick={authenticateUser}
      >
        Sign in
      </Button>
    </div>
  );
};

export default Home;
