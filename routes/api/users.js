const express = require('express');
const {
    getUsers, 
    login, 
    registerUser, 
    getUserProfile, 
    updateUserProfile, 
    deleteUser,
    getUserById,
    updateUser
} = require('../../controller/usercontroller');
const { protect, admin } = require('../../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', login);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

module.exports = router;