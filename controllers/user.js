const User = require("../models/users");
const Bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async (request, response) => {
  // check if your exist
  let existEmail = request.body.email;
  let existingUser = await User.findOne({ email: existEmail });
  if (existingUser) {
    return response.status(422).json({
      success: false,
      message: `User with this email ${existEmail} already exist try with another email`,
    });
  }

  let {
    name,
    email,
    password,
    phone,
    street,
    apartment,
    city,
    zip,
    country,
    isAdmin,
  } = request.body;
  password = Bcrypt.hashSync(request.body.password, 10);

  // register a new user
  try {
    let newUser = new User({
      name,
      email,
      password,
      phone,
      street,
      apartment,
      city,
      zip,
      country,
      isAdmin,
    });

    let userData = await newUser.save();
    userData = userData.toJSON();
    delete userData.passowrd;
    return response.status(200).json({
      success: true,
      message: userData,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: `Failed to save user due to ${error}`,
    });
  }
};

// get all users
exports.getAllUsers = async (request, response) => {
  try {
    let allUsers = await User.find({}).select("-password");
    return response.status(200).json({ success: true, message: allUsers });
  } catch (error) {
    return response.status(422).json({
      success: false,
      message: `Failed to get all users due to ${error}`,
    });
  }
};

exports.getUserById = async (request, response) => {
  try {
    let user_id = request.params.id;
    if (!mongoose.isValidObjectId(user_id)) {
      return response.status(422).json({
        success: false,
        message: `Invalid User ID ${user_id}`,
      });
    }
    //get single user
    let singleUser = await User.findById(user_id).select("-password");
    return response.status(200).json({
      success: true,
      message: singleUser,
    });
  } catch (error) {
    return response.status(422).json({
      success: false,
      message: `Failed to get user with this ID ${user_id}`,
    });
  }
};

// login user

exports.loginUser = async (request, response) => {
  let user = await User.findOne({ email: request.body.email });
  if (!user)
    return response
      .status(400)
      .json({ success: false, message: "No User with such email " });

  const secret = process.env.secret;
  if (user && Bcrypt.compareSync(request.body.password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret
    );
    return response.status(200).json({
      success: true,
      responseMessage: {
        user: user.email,
        token: token,
      },
    });
  } else {
    return response.status(400).json({
      success: false,
      message: "Password is wrong",
    });
  }
};
