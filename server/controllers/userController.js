import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

//  @desc Auth user/set token
//  @route POST /api/users/login
// @access Public

export const loginAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      isAdmin: user.isAdmin,
      birthdate: user.birthdate,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
  const {
    lastname,
    firstname,
    username,
    email,
    password,
    confirmPassword,
    birthdate,
  } = req.body;

  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const userName = await User.findOne({
    username,
  });

  if (userName) {
    res.status(400);
    throw new Error("Username already exists");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const user = await User.create({
    lastname,
    firstname,
    username,
    email,
    password,
    birthdate,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      lastname: user.lastname,
      firstname: user.firstname,
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    htppOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      lastname: user.lastname,
      firstname: user.firstname,
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

// export const updateUserProfile = asyncHandler(async (req, res) => {

// });

// @desc Get all users
// @route GET /api/users
// @access Private/Admin

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});
