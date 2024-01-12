// UsersList.jsx
import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const UsersList = ({ users = [], groups = [], tabValue, setSelectedUser, setSelectedGroup }) => (
  <List>
    <Typography variant="h6">{tabValue === 'users' ? 'Users' : 'Groups'}</Typography>
    <Divider />

    {tabValue === 'users' ? (
      users.length > 0 ? (
        users.map((user, index) => (
          <ListItem button key={index} onClick={() => setSelectedUser(user.id)}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))
      ) : (
        <Typography>No users available.</Typography>
      )
    ) : (
      groups.length > 0 ? (
        groups.map((group, index) => (
          <ListItem button key={index} onClick={() => setSelectedGroup(group.id)}>
            <ListItemText primary={group.groupName} />
          </ListItem>
        ))
      ) : (
        <Typography>No groups available.</Typography>
      )
    )}
  </List>
);

export default UsersList;
