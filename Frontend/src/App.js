import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import { Typography, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Forgot from './Components/Forgot';
import Chat from './Components/Chat';
import { useSelector } from 'react-redux';

const theme = createTheme();

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#FFC107', padding: '20px', textAlign: 'center', color: '#fff', marginTop: 'auto' }}>
      <Typography variant="body2">&copy; 2024 Metheswar. All Rights Reserved.</Typography>
    </footer>
  );
};

function App() {
  const login = useSelector((state)=>state.authentication.authenticated)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/*" element={<Home />} />
            {!login && <Route path="/signup" element={<Signup />} />}
            {!login && <Route path="/signin" element={<Signin />} />}
            <Route path="/forgot-password" element={<Forgot />} />
            {login && <Route path='/chats' element={<Chat />} />}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
