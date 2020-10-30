import React, { FC, useRef, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import PreMove from './subcomponents/PreMove';

export interface PreMoveOverlayProps {
  className?: string;
  premoves: { from: number, to: number }[];
}

export const PreMoveOverlay: FC<PreMoveOverlayProps> = ({
  className,
  premoves,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [parentDimensions, setParentDimensions] = useState({ height: 0, width: 0 });
  
  useEffect(() => {
    const setSize = () => {
      setParentDimensions({
        height: rootRef.current.clientHeight,
        width: rootRef.current.clientWidth,
      });
    };

    setSize();

    window.addEventListener('resize', setSize);

    return () => window.removeEventListener('resize', setSize);
  }, []);

  return (
    <div ref={rootRef} className={cn(styles.root, className)}>
      {premoves.map(({ from, to }, idx) => {
        return (
          <PreMove
            key={`${from}-${to}-${idx}-premove`}
            parentHeight={parentDimensions.height}
            parentWidth={parentDimensions.width}
            from={from}
            to={to}
          />
        );
      })}
    </div>
  );
};

export default PreMoveOverlay;
