const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/User')

// @desc    Get all users
// @route GET /api/v1/users
// @access  Private/Admin
exports.getUsers = asyncHandler (async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @route POST /api/v1/users/login
// @desc Login user and get token
// @access Public
exports.login = asyncHandler (async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    return res.status(401).json({err: 'Invalid email or password'})
  }
})

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName , email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(400).json({err: 'User already exists'})
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    return res.status(400).json({err: 'Invalid user data'})
  }
})

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  if (user) {
    res.status(200).json(user)
  } else {
    return res.status(404).json({err: 'User not found'})
  }
})

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.companyName = req.body.companyName || user.companyName
    user.address = req.body.address || user.address
    user.state = req.body.state || user.state
    user.country = req.body.country || user.country
    user.phone = req.body.phone || user.phone
    user.whatsapp = req.body.whatsapp || user.whatsapp
    user.accountType = req.body.accountType || user.accountType
    user.logo = req.body.logo || user.logo

    // if (req.body.password) {
    //   user.password = req.body.password
    // }

      await user.save()

      res.status(201).json({
        message: 'Account updated'
      })
  } else {
    return res.status(404).json({err: 'User not found'})
  }
})

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    return res.status(404).json({err: 'User not found'})
  }
})

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    return res.status(404).json({err: 'User not found'})
  }
})

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    return res.status(404).json({err: 'User not found'})
  }
})