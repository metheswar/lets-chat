const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./models/database');
const User = require('./models/user');
const Group = require('./models/group');
const GroupUser = require('./models/groupUser');
const Message = require('./models/message')
const { login, register, getUsers } = require("./controllers/userController");
const { createGroup, getGroups } = require("./controllers/GroupController");
const { createUserMessage, createGroupMessage, getUserMessages } = require("./controllers/messageController");
const http = require('http');
const socketIO = require('socket.io');

dotenv.config();

const PORT = process.env.PORT || 3001;

User.belongsToMany(Group, { through: GroupUser });
User.hasMany(Message, { foreignKey: 'fromUserId' });
User.hasMany(Message, { foreignKey: 'toUserId' });

Group.belongsToMany(User, { through: GroupUser });
Group.hasMany(Message, { foreignKey: 'groupId' });
Group.belongsTo(User, { as: 'groupAdmin', foreignKey: 'groupAdminId' });

const app = express();
app.use(cors());  // Enable CORS for Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",  // Specify the URL of your client app
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {  // Change to 'join-room'
    // You can handle the room join logic here
    console.log(roomId)
    socket.join(roomId);

    // You can emit an event or perform other actions upon successful room join
    io.to(roomId).emit('roomJoined', { success: true, message: 'User joined the room' });
  });
});

app.post("/register", register);
app.post('/login', login);
app.get('/getUsers', getUsers);
app.get('/getGroups', getGroups);
app.post('/createGroup', createGroup);
app.post('/createUserMessage', createUserMessage);
app.post('/createGroupMessage', createGroupMessage);
app.post('/getUserMessages', getUserMessages)

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

server.listen(PORT, () => console.log("Server running on port " + PORT));
