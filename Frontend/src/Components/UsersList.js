import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const UsersList = ({ users, tabValue }) => (
  <List>
    <Typography variant="h6">{tabValue === 'users' ? 'Users' : 'Groups'}</Typography>
    <Divider />

    {users.length > 0 ? (
      users.map((user, index) => (
        <ListItem button key={index}>
          <ListItemText primary={user.name} />
        </ListItem>
      ))
    ) : (
      <Typography>No {tabValue === 'users' ? 'users' : 'groups'} available.</Typography>
    )}
  </List>
);

export default UsersList;
