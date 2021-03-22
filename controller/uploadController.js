const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// @desc    Upload user logo
// @route   POST /api/v1/upload/users
// @access  Private
exports.uploadUserLogo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.logo = `/${req.file.path}`
        await user.save()
        res.json({
            message: 'Image uploaded',
            path: `/${req.file.path}`
          })
          
    }else {
        return res.status(404).json({err: 'User not found'})
    }
  })