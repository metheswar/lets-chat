const { Op } = require('sequelize');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Group = require('../models/group');
const { generateToken, verifyToken } = require('../helpers/JwtToken');
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'User created successfully',success:true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
try {
    const {email,password} = req.body;
    const user = await User.findOne({ where: { email } });
    const passwordValid = await bcrypt.compare(password,user.password);
  
    if(!passwordValid){
        console.log(false)
        res.status(401).json({message:'Invalid email or password'})
    }
    const token = generateToken(user.id)
    res.status(200).json({success:true,token:token})
} catch (error) {
  console.error(error);
  return res.status(500).json({ error: 'Internal Server Error' });
}
};
const getUsers = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const currentUserId = decodedToken.userId;

    const users = await User.findAll({
      attributes: ['name', 'id'],
      where: {
        id: {
          [Op.ne]: currentUserId, 
        },
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getGroups = async(req,res)=>{
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { register, login,getUsers ,getGroups};

