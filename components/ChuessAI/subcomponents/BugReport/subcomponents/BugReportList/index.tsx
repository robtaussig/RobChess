import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { BugReport as BugReportType } from '../../state';
import BugReport from '../BugReport';

export interface BugReportListProps {
    className?: string;
    bugReports: BugReportType[];
}

export const BugReportList: FC<BugReportListProps> = ({
    className,
    bugReports,
}) => {
    console.log(bugReports);

    return (
        <div className={cn(styles.root, className)}>
            <h2 className={styles.header}>List of reported bugs</h2>
            {bugReports.slice().reverse().map(bugReport => {
                return (
                    <BugReport
                        key={`${bugReport.description}-bug-report`}
                        className={styles.bugReport}
                        bugReport={bugReport}
                    />
                );
            })}
        </div>
    );
};

export default BugReportList
