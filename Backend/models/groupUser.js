const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const GroupUser = sequelize.define('GroupUser', {
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = GroupUser;
