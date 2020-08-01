const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const restaurantList = require('../../restaurant.json')

db.once('open', () => {
  const results = restaurantList.results
  console.log(results)
  for (let i = 0; i < results.length; i++) {
    const { name, category, image, location, phone, google_map, rating, description } = results[i]
    Restaurant.create({ name, category, image, location, phone, google_map, rating, description })
  }
  console.log('done.')
})
