import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Button, Modal, TextField, IconButton, Autocomplete, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ColorTabs = ({ value, handleChange, allUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCreateGroup = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = {
        groupName: groupName,
        users: selectedUsers,
      };
      const response = await fetch('http://localhost:3001/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleCloseModal = () => {
    setGroupName('');
    setSearchValue('');
    setSearchResults([]);
    setSelectedUsers([]);
    setIsModalOpen(false);
  };
  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  
    // Check if allUsers is defined before filtering
    const matchingUsers = (allUsers || []).filter(user =>
      user.name && user.name.toLowerCase().includes(newValue.toLowerCase())
    );
  
    setSearchResults(matchingUsers);
  };

  const handleUserSelect = (event, newValue) => {
    setSelectedUsers(newValue);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setGroupName('');
      setSearchValue('');
      setSearchResults([]);
      setSelectedUsers([]);
    }
  }, [isModalOpen]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{ flexGrow: 1 }}
      >
        <Tab value="users" label="Users" />
        <Tab value="groups" label="Groups" />
      </Tabs>

      {/* Create Group Button */}
      <IconButton onClick={() => setIsModalOpen(true)} color="secondary" size="large">
        <AddIcon />
      </IconButton>

      {/* Modal for creating a group */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',  // Responsive width
            maxWidth: 400, // Max width
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="Group Name"
            fullWidth
            margin="normal"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          {/* Add Users Form */}
          <Autocomplete
            multiple
            id="user-search"
            value={selectedUsers}
            onChange={handleUserSelect}
            inputValue={searchValue}
            onInputChange={handleSearchChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add Users"
                fullWidth
                margin="normal"
              />
            )}
            options={searchResults}
            getOptionLabel={(user) => user.name}  // Assuming searchResults is an array of objects
          />
          <Button variant="contained" color="primary" onClick={handleCreateGroup}>
            Create Group
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ColorTabs;
