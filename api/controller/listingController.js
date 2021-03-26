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
        images, show } = req.body
  
    const listing = await Listing.create({
      user: req.user._id,
        title, location, 
        price, bathrooms, 
        bedrooms, toilets, 
        description, category,
        images, show
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

// @desc    Get user listings
// @route   GET /api/v1/listings/mylist
// @access  Private
exports.getUserListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ user: req.user._id })
  res.json(listings)
})  

// @desc    Get single user listing by slug
// @route   GET /api/v1/listings/mylist/:slug
// @access  Private
exports.getSingleUserListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findOne({ slug: req.params.slug, user: req.user._id })
  if (listing) {
    res.json(listing)
  } else {
    return res.status(404).json({err: 'Listing not found'})
  }
})

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateUserListing = asyncHandler(async (req, res) => {
  const { 
    title, location, 
    price, bathrooms, 
    bedrooms, toilets, 
    description, category,
    images, show } = req.body

  const listing = await Listing.findOne({ slug: req.params.slug, user: req.user._id })

  if (listing) {
    listing.title = title || listing.title
    listing.location = location || listing.location
    listing.price = price || listing.price
    listing.bathrooms = bathrooms || listing.bathrooms
    listing.bedrooms = bedrooms || listing.bedrooms
    listing.toilets = toilets || listing.toilets
    listing.description = description || listing.description
    listing.category = category || listing.category
    listing.show = show || listing.show

    if(images){
      listing.images = [...listing.images, ...images]
    }

    const updatedListing = await listing.save()

      res.json({
        message: 'Listing updated',
        listing: updatedListing
      })
  } else {
    return res.status(404).json({err: 'Listing not found'})
  }
})

// @desc    show listings
// @route   GET /api/v1/listings/show
// @access  Public
exports.showListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ status: true, show: true })
  res.json(listings)
}) 

// @desc    Get single listing by slug
// @route   GET /api/v1/listings/show/:slug
// @access  Public
exports.showListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findOne({ slug: req.params.slug, status: true, show: true })
  if (listing) {
    res.json(listing)
  } else {
    return res.status(404).json({err: 'Listing not found'})
  }
})