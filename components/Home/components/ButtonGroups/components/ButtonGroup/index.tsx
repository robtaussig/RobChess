import React, { FC, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { ButtonGroup as ButtonGroupType, LinkButton as LinkButtonType } from '../../types';
import Button from '../../../../../Button';

export interface ButtonGroupProps {
  className?: string;
  buttonGroup: ButtonGroupType | LinkButtonType;
  revealItems: boolean;
  onRevealItems: () => void;
  horizontal?: boolean;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
  className,
  revealItems,
  onRevealItems,
  buttonGroup,
  horizontal = true,
}) => {
  const [revealedItems, setRevealedItems] = useState(null);

  if ('link' in buttonGroup) {
    return (
      <Button
        className={styles.linkButton}
        link={buttonGroup.link}
      >
        {buttonGroup.name}
      </Button>
    );
  }


  return (
    <div
      className={cn(styles.root, className, {
        [styles.horizontal]: horizontal,
      })}
    >
      {!revealItems ? (<Button
        className={styles.revealItems}
        onClick={onRevealItems}  
      >
        {buttonGroup.name}
      </Button>) : (
        <h2 className={styles.revealHeader}>
          {buttonGroup.name}:
        </h2>
      )}
      {revealItems && (
        <>
          {buttonGroup.items.map((item, idx) => {
            return (
              <ButtonGroup
                key={`${idx}-item`}
                buttonGroup={item}
                revealItems={revealedItems === idx}
                onRevealItems={() => setRevealedItems(idx)}
                horizontal={!horizontal}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ButtonGroup;
