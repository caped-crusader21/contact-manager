const { response, request } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (request, response) => {
  const { userName, email, password } = request.body;

  if (!userName || !email || !password) {
    response.status(400);
    throw new Error("All fields are Mandatory!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    response.status(400);
    throw new Error("User already exists!");
  }

  //hash passward
  const hashedPassword = await bcrypt.hash(password, 10); //###
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  if (user) {
    response.status(201).json({ _id: user.id, email: user.email });
  } else {
    response.status(400);
    throw new Error("User data is not valid");
  }
});

const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400);
    throw new Error("All fields are Mandatory!");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const acessToken = jwt.sign(
      {
        user: {
          username: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    response.status(200).json({ acessToken });
  } else {
    response.status(401);
    throw new Error("Either Email or Password in Incorrect");
  }
});

const currentUser = asyncHandler(async (request, response) => {
  response.json(request.user);
});

module.exports = { registerUser, loginUser, currentUser };
