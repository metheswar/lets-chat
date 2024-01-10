// server.js
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./models/database');
const { login, register } = require("./controllers/userController");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/register", register);
app.post('/login',login)

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Error syncing database:', err);
});
app.listen(PORT, () => console.log("Server running on port " + PORT));
