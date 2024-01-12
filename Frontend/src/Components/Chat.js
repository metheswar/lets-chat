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
  const [tabValue, setTabValue] = useState('users');

  const fetchTabData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        tabValue === 'users' ? 'http://localhost:3001/getUsers' : 'http://localhost:3001/getGroups',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUsers(data);
      console.log(`${tabValue} fetched:`, data);
      console.log(`${tabValue} state:`, users);
    } catch (error) {
      console.error(`Error fetching ${tabValue}:`, error);
    }
  };

  useEffect(() => {
    fetchTabData();
  }, [tabValue]);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const chatMessages = [
    { sender: 'User 1', text: 'Hello!', timestamp: Date.now() },
    { sender: 'User 2', text: 'Hi there!', timestamp: Date.now() + 1000 },
  ];
  const handleSendButtonClick = () => {

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
          tabValue={tabValue}
          theme={theme}
          ColorTabs={ColorTabs}
          handleTabChange={handleTabChange}
          />
          ) : (
            <Grid item xs={12} sm={6} md={4} lg={3} style={{ paddingRight: theme.spacing(2) }}>
              <Input placeholder="Search users" fullWidth style={{ marginBottom: theme.spacing(2) }} />
              <ColorTabs value={tabValue} handleChange={handleTabChange} />
              <UsersList users={users} tabValue={tabValue} />
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

              <ChatMessages chatMessages={chatMessages} theme={theme} />
            </div>

            <ChatInput isSmallScreen={isSmallScreen} handleSendButtonClick={handleSendButtonClick} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Chat;
