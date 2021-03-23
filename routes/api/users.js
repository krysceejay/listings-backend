const express = require('express')
const {
    getUsers, 
    login, 
    registerUser, 
    getUserProfile, 
    updateUserProfile, 
    deleteUser,
    getUserById,
    updateUser
} = require('../../controller/usercontroller')
const { protect, admin } = require('../../middleware/authMiddleware')
const { regUserVal, updateUserVal } = require('../../middleware/validator/userValidator')

const router = express.Router()

router.get('/test', (req, res) => res.json({ msg: 'users works testing again' }))
router.route('/')
  .post(
    regUserVal, 
    registerUser)
  .get(protect, admin, getUsers)

router.post('/login', login)

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserVal, updateUserProfile)

router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

module.exports = router