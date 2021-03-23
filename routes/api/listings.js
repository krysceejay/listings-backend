const express = require('express')
const {
    addListing,
    getListings
} = require('../../controller/listingController')
const { protect, admin } = require('../../middleware/authMiddleware')

const router = express.Router()

router.route('/')
  .post(protect, addListing)
  .get(protect, admin, getListings)

module.exports = router  