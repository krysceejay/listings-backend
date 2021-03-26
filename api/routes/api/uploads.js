const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')
const { protect } = require('../../middleware/authMiddleware')
const { 
  uploadUserLogo, 
  uploadUserListingImg,
  deleteImg } = require('../../controller/uploadController')

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let dir = `uploads${req.url}/${req.user._id}`
    fs.access(dir, error => {
      if (error) {
        fs.mkdir(dir, {recursive: true }, err => {
            if (err) {
              cb('An error occured')
            }
          })
        }
        return cb(null, dir)
     })
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.put('/users', protect, upload.single('image'), uploadUserLogo)

router.post('/listings', protect, upload.array('image', 8), uploadUserListingImg)

router.delete('/delete/:img', protect, deleteImg)

//TODO: Check file size
module.exports = router