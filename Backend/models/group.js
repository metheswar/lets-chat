const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Group = sequelize.define('Group', {
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Group