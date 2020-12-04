import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Nav from './components/Nav';
import Lobby from './components/Lobby';
import { init } from '../../redux/lichess';

export interface LichessProps {

}

export const Lichess: FC<LichessProps> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(init());
    }, []);

    return (
        <div className={styles.root}>
            <Nav className={styles.nav}/>
            <Lobby className={styles.lobby}/>
        </div>
    );
};

export default Lichess
