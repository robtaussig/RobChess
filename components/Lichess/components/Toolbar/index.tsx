import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Option from './components/Option';

export interface AccountProps {
    className?: string;
}

export const Account: FC<AccountProps> = ({
    className,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <h1 className={styles.header}>robchess<span>.com</span></h1>
            <ul className={styles.options}>
                <Option
                    className={styles.option}
                    text={'Play'}
                    subOptions={[
                        {
                            label: 'Create a game',
                            onClick: console.log,
                        },
                        {
                            label: 'Arena tournaments',
                            onClick: console.log,
                        },
                        {
                            label: 'Swiss tournaments',
                            onClick: console.log,
                        },
                        {
                            label: 'Simultaneous exhibitions',
                            onClick: console.log,
                        },
                    ]}
                />
                <Option
                    className={styles.option}
                    text={'Learn'}
                    subOptions={[
                        {
                            label: 'Chess basics',
                            onClick: console.log,
                        },
                        {
                            label: 'Puzzles',
                            onClick: console.log,
                        },
                        {
                            label: 'Practice',
                            onClick: console.log,
                        },
                        {
                            label: 'Coordinates',
                            onClick: console.log,
                        },
                        {
                            label: 'Study',
                            onClick: console.log,
                        },
                        {
                            label: 'Coaches',
                            onClick: console.log,
                        },
                    ]}
                />
                <Option
                    className={styles.option}
                    text={'Watch'}
                    subOptions={[
                        {
                            label: 'Lichess TV',
                            onClick: console.log,
                        },
                        {
                            label: 'Current games',
                            onClick: console.log,
                        },
                        {
                            label: 'Streamers',
                            onClick: console.log,
                        },
                        {
                            label: 'Broadcasts',
                            onClick: console.log,
                        },
                        {
                            label: 'Video library',
                            onClick: console.log,
                        },
                    ]}
                />
                <Option
                    className={styles.option}
                    text={'Community'}
                    subOptions={[
                        {
                            label: 'Players',
                            onClick: console.log,
                        },
                        {
                            label: 'Teams',
                            onClick: console.log,
                        },
                        {
                            label: 'Forums',
                            onClick: console.log,
                        },
                    ]}
                />
                <Option
                    className={styles.option}
                    text={'Tools'}
                    subOptions={[
                        {
                            label: 'Analysis board',
                            onClick: console.log,
                        },
                        {
                            label: 'Opening explorer',
                            onClick: console.log,
                        },
                        {
                            label: 'Board editor',
                            onClick: console.log,
                        },
                        {
                            label: 'Import game',
                            onClick: console.log,
                        },
                        {
                            label: 'Advanced search',
                            onClick: console.log,
                        },
                    ]}
                />
            </ul>
        </div>
    );
};

export default Account
