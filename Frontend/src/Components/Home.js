import React from 'react';
import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import chat from './chat.jpg';

const Home = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div style={{ overflow: 'auto' }}>
      <Container sx={{ marginTop: '4rem', paddingBottom: '60px' }}>
        <Grid container spacing={3}>
          {/* Left side - Image */}
          <Grid item xs={12} md={6}>
            <img
              src={chat}
              alt="Chat"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </Grid>

          {/* Right side - Content */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: isMobile ? '20px' : '50px',
            }}
          >
            <Typography variant="h5" gutterBottom>
              About This App
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </Typography>
            <Typography paragraph>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
