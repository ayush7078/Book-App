const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON } = require('../utils/fileUtils');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

const SECRET = 'your_jwt_secret';

exports.register = async (req, res, next) => {
  try {
    const {name, email, password } = req.body;
    const users = await readJSON(usersPath);
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), email, password: hashed, name };
    users.push(newUser);
    await writeJSON(usersPath, users);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = await readJSON(usersPath);
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
