const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema

mongoose.plugin(slug)

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
  slug: { 
    type: String, 
    slug: 'title',
    unique: true
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
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  show: {
    type: Boolean,
    required: true,
    default: true
  },
},{
  timestamps: true
})

// ListingSchema.pre('save', next => {
//   if(this.title){
//     this.slug = this.title.split(" ").join("-")
//   }
//   next()
  
// })

module.exports = Listing = mongoose.model('Listing', ListingSchema)
