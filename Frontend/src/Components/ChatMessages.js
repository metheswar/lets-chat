import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';

const ChatMessages = ({ theme, selectedUser, selectedGroup, tabValue }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const requestBody = { fromUserId: userId, toUserId: selectedUser };
        const response = await fetch('http://localhost:3001/getUserMessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        setChatMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (tabValue === 'users' && selectedUser) {
      fetchMessages();
    } else {
      setChatMessages([]);
    }

    const fetchInterval = setInterval(() => {
      if (tabValue === 'users' && selectedUser) {
        fetchMessages();
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(fetchInterval);
    };
  }, [tabValue, selectedUser, userId]);

  const isChatActive = tabValue === 'users' ? selectedUser : selectedGroup;

  return (
    <div style={{ minHeight: '40vh', marginBottom: theme.spacing(2) }}>
      {isChatActive && (
        <>
          {chatMessages.length === 0 ? (
            <Typography variant="body1">No conversations yet.</Typography>
          ) : (
            chatMessages.map((message, index) => (
              <Paper
                key={index}
                elevation={3}
                style={{
                  marginBottom: theme.spacing(1),
                  padding: theme.spacing(2),
                  width: 'fit-content',
                  marginLeft: message.fromUserId == userId ? 'auto' : 1,
                  marginRight: message.fromUserId == userId ? 1 : 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems:
                    message.fromUserId == userId ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{ textAlign: 'right', flex: 1 }}>
                  <Typography variant="body1">
                    {`${message.fromUserId == userId ? 'You' : 'User'}: ${message.text}`}
                  </Typography>
                  <small style={{ color: 'blue' }}>
                    {new Date(message.createdAt).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </small>
                </div>
              </Paper>
            ))
          )}
        </>
      )}

      {!isChatActive && (
        <Typography variant="body1">Select a user to start chatting.</Typography>
      )}
    </div>
  );
};

export default ChatMessages;
