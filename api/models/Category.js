const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Category = mongoose.model("category", CategorySchema)

module.exports = Category
