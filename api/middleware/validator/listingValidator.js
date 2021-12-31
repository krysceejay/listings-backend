const {check, validationResult} = require('express-validator')

exports.addListingVal = [
    check('title', 'Title is required').notEmpty().trim().escape(),
    check('location', 'Location is required').notEmpty().trim().escape(),
    check('price', 'Price is required').notEmpty().trim().escape(),
    check('description', 'Description is required').notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({err: errors.array()})
    next()
  },
]