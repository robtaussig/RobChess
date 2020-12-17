import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Version as VersionType, ChangeType } from '../../constants';
import Modal from '../../../Modal';

export interface ChangeLogProps {
    className?: string;
    changelog: VersionType[];
    open: boolean;
    onClose: () => void;
}

export const ChangeLog: FC<ChangeLogProps> = ({
    className,
    open,
    onClose,
    changelog,
}) => {

    return <Modal
        open={open}
        onClose={onClose}
        title="Changelog"
    >
        <div className={styles.root}>
            {changelog.reverse().map(({ version, changes }) => {
                return (
                    <div key={`${version}-version`} className={cn(styles.version, className)}>
                        <h2 className={styles.versionNumber}>{version}</h2>
                        {changes.map(({ text, type, description, credit }) => {
                            return (
                                <div key={`${text}-${description}-change`} className={cn(styles.change, className)}>
                                    <span className={cn(styles.type, className, {
                                        [styles.release]: type === ChangeType.Release,
                                        [styles.bug]: type === ChangeType.BugFix,
                                        [styles.improvement]: type === ChangeType.Improvement,
                                        [styles.feature]: type === ChangeType.Feature,
                                        [styles.styling]: type === ChangeType.Styling,
                                    })}>
                                        [{type}]
                                    </span>
                                    <span>{text}</span>
                                    {description && (
                                        <p>{description}</p>
                                    )}
                                    {credit && (
                                        <p>Reported by: {credit}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    </Modal>
};

export default ChangeLog
