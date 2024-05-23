// src/pages/agent/AgentView.js

import React, { useEffect, useState } from 'react';
import  Chat  from '../chat/Chat';
import styles from './AgentView.module.css';

const fetchSummary = async (session_id:any) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/summary?session_id=${session_id}`);
    const data = await response.json();
    return data;
};

const AgentView = () => {
    const [summary, setSummary] = useState('');
    const sessionId = '1234'; // Placeholder session ID, you should replace it with actual logic to get session ID

    useEffect(() => {
        const getSummary = async () => {
            const summaryData = await fetchSummary(sessionId);
            setSummary(summaryData.summary);
        };

        getSummary();
    }, [sessionId]);

    return (
        <div className={styles.container}>
            <div className={styles.chatContainer}>
                <Chat />
            </div>
            <div className={styles.summaryContainer}>
                <h2>Conversation Summary</h2>
                <p>{summary}</p>
            </div>
        </div>
    );
};

export default AgentView;
