import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { BugReport as BugReportType } from '../../state';
import { formatDistance, parseISO } from 'date-fns';
import { setState } from '../../../../../../redux/board';

export interface BugReportProps {
    className?: string;
    bugReport: BugReportType;
}

export const BugReport: FC<BugReportProps> = ({
    className,
    bugReport,
}) => {
    const { email, createdAt, description, state } = bugReport;
    const dispatch = useDispatch();

    const handleShow = () => {
        const accepted = confirm('This will replace your current application state with the state as reported by this user. Any games in progress will end.');
        if (accepted) {
            dispatch(setState(JSON.parse(state)));
        }
    };

    return (
        <div className={cn(styles.root, className)}>
            <span className={cn(styles.email, styles.value)}>{email ?? 'Anonymous'}</span>
            <span className={cn(styles.description, styles.value)}>{description}</span>
            <span className={cn(styles.date, styles.value)}>{createdAt ? formatDistance(parseISO(createdAt), new Date()) : 'Now'}</span>
            <button className={cn(styles.stateButton, styles.value)} onClick={handleShow}>Show</button>
        </div>
    );
};

export default BugReport
