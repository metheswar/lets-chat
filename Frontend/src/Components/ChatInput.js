import React, { useState, useEffect } from 'react';
import { TextareaAutosize as BaseTextareaAutosize, Grid, Button, styled } from '@mui/material';
import io from 'socket.io-client';

const StyledTextareaAutosize = styled(BaseTextareaAutosize)`
  width: 100%;
  max-height: 150px;
  font-family: 'Noto Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;

  &:focus-visible {
    outline: 0;
  }
`;

const socket = io('http://localhost:3001'); // Change the URL to match your server

const ChatInput = ({ isSmallScreen, selectedUser, selectedGroup, currentTab }) => {
  const [message, setMessage] = useState('');

  const handleSendButtonClick = () => {
    try {
      const token = localStorage.getItem('token');
      const fromUserId = localStorage.getItem('userId');
      const requestBody = { text: message, fromUserId, toUserId: selectedUser };

      socket.emit('createUserMessage', requestBody, (response) => {
        console.log('User message created:', response);
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item xs={isSmallScreen ? 9 : 11}>
        <StyledTextareaAutosize
          maxRows={2}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Grid>
      <Grid item xs={isSmallScreen ? 3 : 1}>
        <Button variant="contained" color="primary" onClick={handleSendButtonClick}>
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChatInput;