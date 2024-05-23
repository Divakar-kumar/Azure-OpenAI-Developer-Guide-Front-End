import React, { useEffect, useState } from 'react';
import  Chat  from '../chat/Chat';
import styles from './Agent.module.css';
import { SummaryAppRequest, SummaryResponse, fetchSummary } from '../../api';

const AgentView = () => {
    const [summary, setSummary] = useState('');
    const sessionId = '1234'; // Placeholder session ID, you should replace it with actual logic to get session ID

    useEffect(() => {
       
        const getSummary = async () => {
            const request: SummaryAppRequest = {                
                session_id: "1234"
            };

            const response = await fetchSummary(request);      
            const contentType = response.headers.get("content-type");
            if (!response.body) {
                throw Error("No response body");
            } else if (contentType?.indexOf('text/html') !== -1 || contentType?.indexOf('text/plain') !== -1) {
                const bodyText = await response.text();
                console.error(`Chat Error: ${bodyText}`);                            
            }else {
                const parsedResponse: SummaryResponse = await response.json();
                setSummary(parsedResponse.message);
            }
            
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
