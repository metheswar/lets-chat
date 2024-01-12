// AppDrawer.jsx
import React from 'react';
import { Drawer, Input, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import UsersList from './UsersList';

const AppDrawer = ({
  drawerOpen,
  toggleDrawer,
  users,
  groups,
  tabValue,
  theme,
  ColorTabs,
  handleTabChange,
  setSelectedUser,
  setSelectedGroup,
}) => (
  <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} variant="temporary">
    <div style={{ width: '100%' }}>
      <div style={{ padding: theme.spacing(2) }}>
        <Input placeholder="Search users" fullWidth style={{ marginBottom: theme.spacing(2) }} />
        <ColorTabs value={tabValue} handleChange={handleTabChange} allUsers={tabValue === 'users' ? users : groups} />

        <List>
          <UsersList
            users={users}
            groups={groups}
            tabValue={tabValue}
            setSelectedUser={setSelectedUser}
            setSelectedGroup={setSelectedGroup}
          />
        </List>
      </div>
    </div>
  </Drawer>
);

export default AppDrawer;
