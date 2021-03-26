const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const { clearImage } = require('../utils/file')

// @desc    Upload user logo
// @route   POST /api/v1/upload/users
// @access  Private
exports.uploadUserLogo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        if (user.logo) {
            clearImage(user.logo)
        }
        res.json({
            message: 'Image uploaded',
            path: `/${req.file.path}`
          })

    }else {
        return res.status(404).json({err: 'User not found'})
    }
  })

// @desc    Upload user listing images
// @route   POST /api/v1/upload/listings
// @access  Private
exports.uploadUserListingImg = asyncHandler(async (req, res) => {
    let paths = []
    req.files.forEach(file => {
        paths.push(`/${file.path}`)
    })
    res.json({
        message: 'Images uploaded',
        paths
    })
  })

  // @desc    Delete image
// @route   DELETE /api/v1/upload/delete
// @access  Private
exports.deleteImg = asyncHandler(async (req, res) => {
    clearImage(req.params.img)
    res.json({
        message: 'Images deleted'
    })
  })