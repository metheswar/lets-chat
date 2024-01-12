import React from 'react';
import { Drawer, Input, List, ListItem, ListItemText, Typography } from '@mui/material';

const AppDrawer = ({ drawerOpen, toggleDrawer, users, tabValue, theme, ColorTabs, handleTabChange }) => (
  <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} variant="temporary">
    <div style={{ width: '100%' }}>
      <div style={{ padding: theme.spacing(2) }}>
        <Input placeholder="Search users" fullWidth style={{ marginBottom: theme.spacing(2) }} />
        <ColorTabs value={tabValue} handleChange={handleTabChange} />

        {users.length > 0 ? (
          users.map((user, index) => (
            <ListItem button key={index}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))
        ) : (
          <Typography>No {tabValue === 'users' ? 'users' : 'groups'} available.</Typography>
        )}
      </div>
    </div>
  </Drawer>
);

export default AppDrawer;
