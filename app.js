const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
// var confirmDialog = require('confirm-dialog')

const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static('public'))

// routes setting
// app.get('/', (req, res) => {
//   res.render('index')
// })
// 首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean() // 把資料轉換成單純的 JS 物件, Promise(ES6)方法
    .sort({ _id: 'asc' }) // desc
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// Search
app.get('/search', (req, res) => {
  let keyword = ''
  keyword = req.query.keyword.trim()
  // console.log(`keyword=[${keyword}] ${keyword.length}`)
  if (keyword === '') 
    res.redirect('/')
  else {
    keyword = keyword.toLowerCase()
    // console.log(`keyword = ${keyword}`)
    return Restaurant.find({ name: { $regex: `${keyword}`, $options: 'i' } })
      .lean()
      .then((restaurants) => res.render('index', { restaurants: restaurants, keyword }))
      .catch((error) => console.log(error))
  }
})

// 新增(New)(Create)
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  console.log(req.body)
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽 (Read) (Detail)
app.get('/restaurants/:_id', (req, res) => {
  // console.log(req.params._id)
  const id = req.params._id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// Edit
app.get('/restaurants/:_id/edit', (req, res) => {
  console.log(req.params)
  const id = req.params._id
  return Restaurant.findById(id)
     .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
     .catch((error) => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// Delete
app.delete('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
