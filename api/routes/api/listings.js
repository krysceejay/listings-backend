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

/** 
 * @swagger
 * components:
 *  schemas:
 *    Listings:
 *      type: object
 *      properties:
 *        id:
 *          type: string 
 *          example: 6tttttafaddfa 
 *        name:
 *          type: string
 *          example: Flat
 *      required:  
 *        - id
 *        - name 
 *  
 * paths:
 *  /listings/show:
 *    get:
 *      summary: Returns all listings
 *      tags: [Listings]
 *      parameters: []
 *      responses:
 *        '200':
 *           description: A JSON array of listings
 *           content:
 *             application/json:
 *              schema: 
 *                $ref: '#/components/schemas/Listings'
 * */

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