import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { reset } from '../../redux/board';
import ButtonGroups from './components/ButtonGroups';
import { ButtonGroups as ButtonGroupsConstant } from './constants';

export interface HomeProps {
  
}

export const Home: FC<HomeProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  return (
    <div className={styles.root}>
      <h1 className={styles.header}>
        Rob Chess
      </h1>
      <ButtonGroups
        className={styles.buttonGroups}
        buttonGroups={ButtonGroupsConstant}
      />
    </div>
  );
};

export default Home;
