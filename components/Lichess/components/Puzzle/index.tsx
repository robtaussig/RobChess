import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Board from '../Board';

export interface PuzzleProps {
    className?: string;
    puzzle: string;
}

export const Puzzle: FC<PuzzleProps> = ({
    className,
    puzzle,
}) => {

    if (!puzzle) return null;

    return (
        <div className={cn(styles.root, className)}>
            <span className={styles.puzzleText}>Puzzle of the day</span>
            <Board
                className={styles.board}
                board={puzzle}
                lastMove={null}
            />
            <span className={styles.currentTurnText}>White to play</span>
        </div>
    );
};

export default Puzzle
