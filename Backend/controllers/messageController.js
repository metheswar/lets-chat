const { verifyToken } = require('../helpers/JwtToken');
const Message = require('../models/message');
const { Op } = require('sequelize');

// Controller to create a user message
exports.createUserMessage = async (req, res) => {
  try {
    const { fromUserId, toUserId, text } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);

    if (decodedToken.userId) {
      const userMessage = await Message.create({
        fromUserId:decodedToken.userId,
        toUserId,
        text,  // Corrected property name
      });

      res.json(userMessage);
    } else {
      throw new Error('Invalid user identity');
    }
  } catch (error) {
    console.error('Error creating user message:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller to create a group message
exports.createGroupMessage = async (req, res) => {
  try {
    const { groupId, fromUserId, text } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);

    if (decodedToken.userId) {
      const groupMessage = await Message.create({
        groupId,
        fromUserId:decodedToken.userId,
        text,  // Corrected property name
      });

      res.json(groupMessage);
    } else {
      throw new Error('Invalid user identity');
    }
  } catch (error) {
    console.error('Error creating group message:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller to get user messages
exports.getUserMessages = async (req, res) => {
    try {
      const { fromUserId, toUserId } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = verifyToken(token);
  
      if (decodedToken.userId) {
        // Query messages where either fromUserId or toUserId matches
        const userMessages = await Message.findAll({
          where: {
            [Op.or]: [
              { fromUserId, toUserId },
              { fromUserId: toUserId, toUserId: fromUserId },
            ],
          },
          order: [['createdAt', 'ASC']],  // Adjust order as needed
        });
  
        res.json(userMessages);
      } else {
        throw new Error('Invalid user identity');
      }
    } catch (error) {
      console.error('Error getting user messages:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
