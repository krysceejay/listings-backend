const express = require('express')
const {
    addListing,
    getListings,
    getUserListings,
    getSingleUserListing,
    updateUserListing,
    showListings,
    showListing
} = require('../../controller/listingController')
const { protect, admin } = require('../../middleware/authMiddleware')

const router = express.Router()  

//Guest routes
router.get('/show', showListings)
router.get('/show/:slug', showListing)

//Protected and Admin routes
router.route('/')
  .post(protect, addListing)
  .get(protect, admin, getListings)

router.get('/mylist', protect, getUserListings)
router.route('/mylist/:slug')
  .get(protect, getSingleUserListing)
  .put(protect, updateUserListing)

module.exports = router  