import React from 'react';
import { Paper, Typography } from '@mui/material';

const ChatMessages = ({ chatMessages, theme }) => (
  <div style={{ minHeight: '40vh', marginBottom: theme.spacing(2) }}>
    {chatMessages.map((message, index) => (
      <Paper
        key={index}
        elevation={3}
        style={{
          marginBottom: theme.spacing(1),
          padding: theme.spacing(2),
          width: 'fit-content',
          marginLeft: message.sender === 'User 1' ? 'auto' : 1,
          marginRight: message.sender === 'User 1' ? 1 : 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: message.sender === 'User 1' ? 'flex-end' : 'flex-start',
        }}
      >
        <div style={{ textAlign: 'right', flex: 1 }}>
          <Typography variant="body1">
            {`${message.sender}: ${message.text}`}
          </Typography>
          <small style={{color:'blue'}}>
            {new Date(message.timestamp).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </small>
        </div>
      </Paper>
    ))}
  </div>
);

export default ChatMessages;
