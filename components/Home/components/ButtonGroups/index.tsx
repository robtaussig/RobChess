import React, { FC, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { ButtonGroup as ButtonGroupType } from './types';
import ButtonGroup from './components/ButtonGroup';

export interface ButtonGroupsProps {
  className?: string;
  buttonGroups: ButtonGroupType[];
}

export const ButtonGroups: FC<ButtonGroupsProps> = ({
  className,
  buttonGroups,
}) => {
  const [revealedItems, setRevealedItems] = useState(null);

  return (
    <div className={cn(styles.root, className)}>
      {buttonGroups.map((buttonGroup, idx) => {
        return (
          <ButtonGroup
            key={`${idx}-button-group`}
            className={styles.buttonGroup}
            buttonGroup={buttonGroup}
            revealItems={revealedItems === idx}
            onRevealItems={() => setRevealedItems(idx)}
          />
        );
      })}
    </div>
  );
};

export default ButtonGroups;
