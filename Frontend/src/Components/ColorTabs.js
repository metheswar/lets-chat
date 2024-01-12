import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Button, Modal, TextField, IconButton, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ColorTabs = ({ value, handleChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);


  const allUsers = ['User1', 'User2', 'User3', 'User4'];

  const handleCreateGroup = () => {
    // Handle the logic to create a group with selected users
    console.log('Create Group clicked! Selected Users:', selectedUsers);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setSearchValue(''); // Clear search value when closing modal
    setSearchResults([]); // Clear search results when closing modal
    setSelectedUsers([]); // Clear selected users when closing modal
    setIsModalOpen(false);
  };

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);

    const matchingUsers = allUsers.filter(user =>
      user.toLowerCase().includes(newValue.toLowerCase())
    );

    setSearchResults(matchingUsers);
  };

  const handleUserSelect = (event, newValue) => {
    setSelectedUsers(newValue);
  };

  useEffect(() => {
    if (!isModalOpen) {
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

          <TextField label="Group Name" fullWidth margin="normal" />
          
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
