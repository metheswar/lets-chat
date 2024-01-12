import React from 'react';
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

const ChatInput = ({ isSmallScreen, handleSendButtonClick }) => (
  <Grid container spacing={1} alignItems="flex-end">
    <Grid item xs={isSmallScreen ? 9 : 11}>
      <StyledTextareaAutosize maxRows={2} placeholder="Type your message..." />
    </Grid>
    <Grid item xs={isSmallScreen ? 3 : 1}>
      <Button variant="contained" color="primary" onClick={handleSendButtonClick}>
        Send
      </Button>
    </Grid>
  </Grid>
);

export default ChatInput;
