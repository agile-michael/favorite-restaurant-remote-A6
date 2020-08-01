const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')

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
app.get('/', (req, res) => {
  Restaurant.find()
    .lean() // 把資料轉換成單純的 JS 物件, Promise(ES6)方法
    .sort({ _id: 'asc' }) // desc
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
