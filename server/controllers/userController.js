import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc: Get all users
// @route: GET /api/users
// @access: Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc: add new user
// @route: POST /api/users
// @access: Public
const addUser = asyncHandler(async (req, res) => {
  const { name, birthday, email, password, role } = req.body;

  // fill all the fields
  if (!name || !birthday || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // check if the texts already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a user
  const user = await User.create({
    name,
    birthday,
    email,
    password: hashedPassword,
    role,
  });

  // add token on res.json
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc: authenticate a user
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for the user
  const user = await User.findOne({ email });

  // check for the password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc: get a user
// @route: GET /api/users/:id
// @access: Public
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc: update a user
// @route: PUT /api/users/:id
// @access: Public
const updateUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new Error('User not found');
  }

  // check if the email already used
  const emailUsed = await User.findOne({ email });

  if (emailUsed) {
    res.status(400);
    throw new Error('Email already used');
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

// @desc: delete a user
// @route: DELETE /api/users/:id
// @access: Public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  await user.deleteOne();

  res.status(200).json(user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export { getUsers, addUser, getUser, updateUser, deleteUser, loginUser };
