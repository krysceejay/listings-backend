const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  platformId : {
    type: String
  },
  platform : {
    type: String
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 192
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 192
  },
  companyName: {
    type: String,
    trim: true,
    maxLength: 192
  },
  address: {
    type: String,
    trim: true,
    maxLength: 192
  },
  state: {
    type: String,
    trim: true,
    maxLength: 192
  },
  country: {
    type: String,
    trim: true,
    maxLength: 192
  },
  phone: {
    type: String,
    trim: true,
    maxLength: 192
  },
  whatsapp: {
    type: String,
    trim: true,
    maxLength: 192
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 192
  },
  password: {
    type: String,
    required: true,
    maxLength: 192
  },
  logo: {
    type: String
  },
  accountType: {
    type: String,
    default: 'Individual'
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

userSchema.methods.matchPassword = async enteredPassword => {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = User = mongoose.model('User', userSchema)
