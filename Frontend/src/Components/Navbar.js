import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileView, setMobileView] = useState(window.innerWidth <= 768);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const updateWindowDimensions = () => {
    setMobileView(window.innerWidth <= 768);
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFC107' }}>
      <Toolbar disableGutters sx={{ marginLeft: '10px', marginRight: '10px' }}>
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            flexGrow: 1,
            display: 'flex',
            fontFamily: 'Noto Sans, sans-serif',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Let's Chat
        </Typography>

        {isMobileView && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleToggleDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        {!isMobileView && (
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button
              variant="text"
              color="primary"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: '#00A9FF',
                },
              }}
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
            <Button
              variant="text"
              color="primary"
              sx={{
                color: 'white',
                marginLeft: 3,
                '&:hover': {
                  backgroundColor: '#00A9FF',
                },
              }}
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="top" open={isDrawerOpen} onClose={handleToggleDrawer}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 2,
            backgroundColor: '#FFC107',
            color: 'white',
          }}
          role="presentation"
        >
          <Button variant="text" sx={{ color: 'white' }} onClick={handleSignUpClick}>
            Sign Up
          </Button>
          <Divider sx={{ width: '100%', backgroundColor: 'white' }} />
          <Button variant="text" sx={{ color: 'white' }} onClick={handleSignInClick}>
            Sign In
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
