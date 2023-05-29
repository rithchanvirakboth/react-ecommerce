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
