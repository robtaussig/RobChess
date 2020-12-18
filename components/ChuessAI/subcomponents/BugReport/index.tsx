import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Modal from '../../../Modal';
import cn from 'classnames';
import { AppState } from '../../../../redux/reducers';

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
    const [email, setEmail] = useState('');
    const [messageType, setMessageType] = useState('Bug');
    const [feedback, setFeedback] = useState('');
    const [isSending, setIsSending] = useState(null);
    const state = useSelector(stateSelector);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
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
        setIsSending(false);
    };

    return <Modal
        open={open}
        onClose={onClose}
        title="Bug Report"
    >
        <form className={styles.root} onSubmit={handleSubmit}>
            <label className={styles.label}>
                Email (optional)
                <input className={styles.input} type={'email'} value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label className={styles.label}>
                Message Type
                <select className={styles.select} value={messageType} onChange={e => setMessageType(e.target.value)}>
                    <option>Bug</option>
                    <option>Suggestion</option>
                    <option>Other</option>
                </select>
            </label>
            <label className={cn(styles.label, styles.feedbackLabel)}>
                Feedback
                <textarea className={styles.textarea} value={feedback} required onChange={e => setFeedback(e.target.value)} />
            </label>
            {isSending ? (
                <div className={styles.loading}><i className={'gg-spinner'} /></div>
            ) : isSending === false ? (
                <div className={styles.sent}><i className={'gg-check'} /></div>
            ) : (
                <input className={styles.submitButton} type={'submit'}/>
            )}
        </form>
    </Modal>
};

export default BugReport
