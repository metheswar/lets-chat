const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./models/database');
const User = require('./models/user')
const Group = require('./models/group')
const GroupUser = require('./models/groupUser')
const Message = require('./models/message')
const { login, register, getUsers, getGroups } = require("./controllers/userController");

// Load environment variables
dotenv.config();

// Set default value for PORT
const PORT = process.env.PORT || 3001;

User.belongsToMany(Group, { through: GroupUser });
User.hasMany(Message, { foreignKey: 'fromUserId' });
User.hasMany(Message, { foreignKey: 'toUserId' });

Group.belongsToMany(User, { through: GroupUser });
Group.hasMany(Message, { foreignKey: 'groupId' });
Group.belongsTo(User, { as: 'groupAdmin', foreignKey: 'groupAdminId' })

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", register);
app.post('/login', login);
app.get('/getUsers', getUsers);
app.get('/getGroups', getGroups);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
