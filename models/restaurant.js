const mongoose = require('mongoose')
const Schema = mongoose.Schema
// rest -> restaurant
const restaurantSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  google_map: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model('Restaurant', restaurantSchema)