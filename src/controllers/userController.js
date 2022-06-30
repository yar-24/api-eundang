const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const cloudinary = require("../middleware/cloudinary");

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const picture = "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
  const idPicProfile = "UserPic_w58kfb"

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    picProfile: picture,
    idPicProfile: idPicProfile
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      picProfile: user.picProfile,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      picProfile: user.picProfile,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Update user data
// @route   UPDATE /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, password, token } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    let user = await User.findById(id);

    //DELETE IMAGE
    const cloudDelete = await cloudinary.uploader.destroy;
    cloudDelete(user.idPicProfile);

    //POST IMAGE
    const cloudUpload = await cloudinary.uploader.upload;
    const picProfile = await cloudUpload(req.file.path);

    const userData = {
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword || user.password,
      picProfile: picProfile.secure_url || user.picProfile,
      idPicProfile: picProfile.public_id || user.idPicProfile,
    };
    user = await User.findByIdAndUpdate(id, userData, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).send(err)
  }
});

// @desc    delete user data
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
   
  try{
    let user = await User.findById(id)
    await cloudinary.uploader.destroy(user.idPicProfile)

    await user.remove()
    res.json(user)
  }catch(err){
    res.status(400).send(err.message);
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let user = await User.findById(id)

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      picProfile: user.picProfile,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getAll = asyncHandler(async (req, res) => {
  const users = await User.find({ user: req.user.id });

  res.status(200).json(users);
});


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getMe,
  getAll,
};
