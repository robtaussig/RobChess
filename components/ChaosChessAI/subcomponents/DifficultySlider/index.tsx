import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export interface DifficultySliderProps {
  className?: string;
  difficulty: number;
  onChangeDifficulty: (difficulty: number) => void;
}

export const DifficultySlider: FC<DifficultySliderProps> = ({
  className,
  difficulty,
  onChangeDifficulty,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <label className={styles.label} htmlFor={'difficulty'}>Difficulty</label>
      <input
        className={styles.input}
        id={'difficulty'}
        name={'difficulty'}
        type={'range'}
        min={0}
        max={10}
        value={difficulty}
        onChange={e => onChangeDifficulty(Number(e.target.value))}
      />
    </div>
  );
};

export default DifficultySlider;
