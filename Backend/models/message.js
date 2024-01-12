const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Message = sequelize.define('Message', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Message;
