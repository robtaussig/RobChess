import React, { FC, useState, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Modal from '../../../Modal';
import cn from 'classnames';
import { AppState } from '../../../../redux/reducers';
import BugReportList from './subcomponents/BugReportList';
import { bugReportReducer, INITIAL_STATE, ActionTypes } from './state';

export interface BugReportProps {
    className?: string;
    open: boolean;
    onClose: () => void;
}

const stateSelector = (state: AppState) => state;

export const BugReport: FC<BugReportProps> = ({
    open,
    onClose,
}) => {
    const [
        {
            email,
            messageType,
            feedback,
            isSending,
            bugReports,
        },
        dispatch,
    ] = useReducer(bugReportReducer, INITIAL_STATE);
    const [] = useState([]);
    const state = useSelector(stateSelector);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
            type: ActionTypes.SendingStart,
        });
        await fetch('https://api.robtaussig.com/bug-report', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                app: 'Chuess',
                type: messageType,
                state,
                email,
                description: feedback,
            }),
        })
        dispatch({
            type: ActionTypes.SendingFinished,
        });
    };

    const handleEdit = (field: string) => (e: any) => {
        dispatch({
            type: ActionTypes.Edit,
            payload: {
                field,
                value: e.target.value,
            }
        });
    };

    useEffect(() => {
        const fetchBugReports = async () => {
            const bugReports = await fetch('https://api.robtaussig.com/bug-reports', {
                method: 'POST',
                mode: 'cors',
                'headers': { 'Accept': 'application/json' },
            }).then(res => res.json());
            dispatch({
                type: ActionTypes.FetchBugReports,
                payload: bugReports,
            });
        };

        fetchBugReports();
    }, []);

    return <Modal
        open={open}
        onClose={onClose}
        title="Bug Report"
    >
        <div className={styles.root}>
            <form onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Email (optional)
                    <input className={styles.input} type={'email'} value={email} onChange={handleEdit('email')}/>
                </label>
                <label className={styles.label}>
                    Message Type
                    <select className={styles.select} value={messageType} onChange={handleEdit('messageType')}>
                        <option>Bug</option>
                        <option>Suggestion</option>
                        <option>Other</option>
                    </select>
                </label>
                <label className={cn(styles.label, styles.feedbackLabel)}>
                    Feedback
                    <textarea className={styles.textarea} value={feedback} required onChange={handleEdit('feedback')} />
                </label>
                {isSending ? (
                    <div className={styles.loading}><i className={'gg-spinner'} /></div>
                ) : isSending === false ? (
                    <div className={styles.sent}><i className={'gg-check'} /></div>
                ) : (
                    <input className={styles.submitButton} type={'submit'}/>
                )}
            </form>
            <BugReportList className={styles.bugReportList} bugReports={bugReports}/>
        </div>
    </Modal>
};

export default BugReport
