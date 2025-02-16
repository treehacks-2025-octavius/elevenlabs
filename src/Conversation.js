'use client';

import { useConversation } from '@11labs/react';
import { useCallback } from 'react';

import './Conversation.css';

// agent is public so don't need api key
// https://elevenlabs.io/docs/conversational-ai/guides/quickstarts/next-js
const ELEVEN_LABS_API_KEY = process.env.REACT_APP_ELEVEN_LABS_KEY;
const AGENT_ID = process.env.REACT_APP_ELEVEN_LABS_AGENT_ID || process.env.ELEVEN_LABS_AGENT_ID;

if (!AGENT_ID) {
  throw new Error('Missing AGENT_ID environment variable');
}


export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });


  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: AGENT_ID,
      });

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="conversation-wrapper">
      <button
        className={conversation.status === 'connected' ? 'connected' : 'disconnected'}
        onClick={
          conversation.status === 'connected'
            ? stopConversation
            : startConversation
        }
      >
        {
          conversation.status === 'connected'
            ? 'End Call'
            : 'Request Assistance'
        }
      </button>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        {conversation.status === 'connected' && (
          <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
        )}
      </div>
    </div>
  );
}
