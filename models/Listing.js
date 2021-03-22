const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ListingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  bathrooms: {
    type: Number,
    trim: true
  },
  bedrooms: {
    type: Number,
    trim: true
  },
  toilets: {
    type: Number,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: [
    {
      type: String
    }
  ],
  images: [
    {
      type: String
    }
  ],
},{
  timestamps: true
})

module.exports = Listing = mongoose.model('Listing', ListingSchema)
