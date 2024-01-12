const Group = require('../models/group');
const { verifyToken } = require('../helpers/JwtToken');

const User = require('../models/user');
const createGroup = async (req, res) => {
    try {
      const { groupName, users } = req.body;
  
      // Extract user ID from the token
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = verifyToken(token);
      const groupAdminId = decodedToken.userId;
  
      // Create the group with the provided group name and make the user the default admin
      const group = await Group.create({ groupName, groupAdminId });
  
      if (users && users.length > 0) {
        const userIds = users.map(user => user.id);
        await group.addUsers(userIds);
      }
  
      // Assuming addUsers is a method for associating the group admin as a user with isAdmin set to true
      await group.addUsers(groupAdminId, { through: { isAdmin: true } });
  
      res.status(201).json({ group });
    } catch (error) {
      console.error('Error creating group:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

const getGroups = async (req, res) => {
  try {
    // Extract user ID from the token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);
    const userId = decodedToken.userId;

    // Fetch groups where the user is registered
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
          attributes: []
        }
      ]
    });

    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createGroup, getGroups };
