const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  googleId : {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  propix: {
    type: String
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
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

module.exports = User;
