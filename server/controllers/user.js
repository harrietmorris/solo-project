// REMOVE-START
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';
// REMOVE-END

const create = async (req, res) => {
  // REMOVE-START
  // console.log('is post working', req.body)
  const {username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });
  if (existingUser) {
    if (existingUser.email === email) {
      return res
      .status(409)
      .send({ error: '409', message: 'Email already exists' });
    } else {
      return res
      .status(409)
      .send({ error: '409', message: 'Username already exists' });
    }
  }
    
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hash,
    });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id, username }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
  // REMOVE-END
};

const login = async (req, res) => {
  // REMOVE-START
  const {username, email, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email: email }, { username: username }] });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id, username: user.username }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
  // REMOVE-END
};

const profile = async (req, res) => {
  // REMOVE-START
  try {
    const { _id, username } = req.user;
    const user = { _id, username };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: 'Resource not found' });
  }
  REMOVE-END
};

const logout = (req, res) => {
  // REMOVE-START
  // delete the token client side upon logout.
  // you would invalidate the token here.
  // REMOVE-END
};

module.exports = { create, login, profile, logout };