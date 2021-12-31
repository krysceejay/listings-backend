const {check, validationResult} = require('express-validator')

exports.regUserVal = [
    check('firstName', 'First Name is required').notEmpty().trim().escape(),
    check('lastName', 'Last Name is required').notEmpty().trim().escape(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'must be at least 6 chars long').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({err: errors.array()})
    next()
  },
]

exports.updateUserVal = [
    check('firstName', 'First Name is required').notEmpty().trim().escape(),
    check('lastName', 'Last Name is required').notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({err: errors.array()})
    next()
  },
]