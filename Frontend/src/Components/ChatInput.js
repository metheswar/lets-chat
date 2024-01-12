import React, { useState } from 'react';
import { TextareaAutosize as BaseTextareaAutosize, Grid, Button, styled } from '@mui/material';

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
const ChatInput = ({ isSmallScreen, selectedUser, selectedGroup, currentTab }) => {
    const [message, setMessage] = useState('');
  
    const createUserMessage = async (token, requestBody) => {
      try {
        const response = await fetch('http://localhost:3001/createUserMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });
  
        const data = await response.json();
        console.log('User message created:', data);
      } catch (error) {
        console.error('Error creating user message:', error);
      }
    };
  
    const createGroupMessage = async (token, requestBody) => {
      try {
        const response = await fetch('http://localhost:3001/createGroupMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });
  
        const data = await response.json();
        console.log('Group message created:', data);
      } catch (error) {
        console.error('Error creating group message:', error);
      }
    };
  
    const handleSendButtonClick = async () => {
      try {
        const token = localStorage.getItem('token');
        const fromUserId = localStorage.getItem('userId'); // Assuming 'userId' is the key
        const requestBody = { text: message, fromUserId };
  
        if (currentTab === 'users' && selectedUser) {
          // Create user message
          requestBody.toUserId = selectedUser;
          await createUserMessage(token, requestBody);
        } else if (currentTab === 'groups' && selectedGroup) {
          // Create group message
          requestBody.groupId = selectedGroup;
          await createGroupMessage(token, requestBody);
        }
  
        // Clear the message input
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