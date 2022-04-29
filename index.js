const express = require('express')
const app = express()

const ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.listen(5000, () => {
  console.log('App listening on port 5000')
})

app.get('/', (req, res) => {
  res.render('index')
})
