import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  createTheme,
  ThemeProvider,
  IconButton,
  Input
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import AppDrawer from './AppDrawer';
import UsersList from './UsersList';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ColorTabs from './ColorTabs';

const theme = createTheme();

const Chat = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(isSmallScreen);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tabValue, setTabValue] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch users
        const usersResponse = await fetch('http://localhost:3001/getUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // Fetch groups
        const groupsResponse = await fetch('http://localhost:3001/getGroups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const groupsData = await groupsResponse.json();
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);


  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Reset selectedUser and selectedGroup when tab changes
    setSelectedUser(null);
    setSelectedGroup(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
        <Grid container style={{ flexGrow: 1, marginTop: theme.spacing(2) }}>
          {isSmallScreen ? (
            <AppDrawer
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
              users={users}
              groups={groups}
              theme={theme}
              ColorTabs={ColorTabs}
              handleTabChange={handleTabChange}
              tabValue={tabValue}
              setSelectedUser={setSelectedUser}
              setSelectedGroup={setSelectedGroup}
            />
          ) : (
            <Grid item xs={12} sm={6} md={4} lg={3} style={{ paddingRight: theme.spacing(2) }}>
              <Input placeholder="Search users" fullWidth style={{ marginBottom: theme.spacing(2) }} />
              <ColorTabs value={tabValue} handleChange={handleTabChange} allUsers={tabValue === 'users' ? users : groups} />

              {/* Pass setSelectedUser and setSelectedGroup as props to UsersList */}
              <UsersList
                users={users}
                groups={groups}
                tabValue={tabValue}
                setSelectedUser={setSelectedUser}
                setSelectedGroup={setSelectedGroup}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={8} lg={9}>
            <div style={{ overflowY: 'auto', flex: 1, maxHeight: '70vh' }}>
              <AppBar position="sticky" color="primary" sx={{ marginBottom: '10px' }}>
                <Toolbar>
                  {isSmallScreen && (
                    <IconButton color="inherit" edge="start" onClick={toggleDrawer(!drawerOpen)} sx={{ mr: 2 }}>
                      <MenuIcon />
                    </IconButton>
                  )}
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Chat App
                  </Typography>
                </Toolbar>
              </AppBar>

              {/* Render ChatMessages component with selectedUser and selectedGroup */}
              <ChatMessages
                theme={theme}
                selectedUser={selectedUser}
                selectedGroup={selectedGroup}
                tabValue={tabValue}
              />
            </div>

            {/* Render ChatInput component with selectedUser and selectedGroup */}
            <ChatInput
              isSmallScreen={isSmallScreen}
              selectedUser={selectedUser}
              selectedGroup={selectedGroup}
              currentTab={tabValue}
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Chat;
