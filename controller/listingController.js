const asyncHandler = require('express-async-handler')
const Listing = require('../models/Listing')

// @desc    Add a new listing
// @route   POST /api/v1/listings
// @access  Private
exports.addListing = asyncHandler(async (req, res) => {
    const { 
        title, location, 
        price, bathrooms, 
        bedrooms, toilets, 
        description, category,
        images } = req.body
  
    const listing = await Listing.create({
        title, location, 
        price, bathrooms, 
        bedrooms, toilets, 
        description, category,
        images
    })
  
    if (listing) {
      res.status(201).json({
        message: 'Added successfully',
        listing
      })
    } else {
      return res.status(400).json({err: 'An error occurred'})
    }
  })

// @desc    Get all listings
// @route GET /api/v1/listings
// @access  Private/Admin
exports.getListings = asyncHandler (async (req, res) => {
    const listings = await Listing.find({})
    res.json(listings)
  })