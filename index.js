const express = require('express')
const app = express()

const ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const expressSession = require('express-session')

app.use(
  expressSession({
    secret: 'keyboard cat',
  })
)

const flash = require('connect-flash')
app.use(flash())

const registerUser = require('./controllers/registerUser')
const newUserController = require('./controllers/newUser')
const usertologin = require('./controllers/usertoLogin')
const userlogin = require('./controllers/userLogin')
const authMiddleware = require('./middleware/authMiddleware')
const logmiddleware = require('./middleware/logmiddleware')
const logoutController = require('./controllers/logout')
const logdin = require('./controllers/logedIn')

app.listen(5000, () => {
  console.log('App listening on port 5000')
})

global.errors = null
global.loggedIn = null
global.passworderor = null

global.first = null
global.last = null
global.email = null

app.get('/', authMiddleware, logdin) //fine

app.post('/user/register', registerUser)
app.post('/user/login', userlogin)

// app.get('/user/login', authMiddleware, toindex)
app.get('/auth/login', logmiddleware, usertologin)
app.get('/auth/register', logmiddleware, newUserController)
app.get('/logout', logoutController)
app.use((req, res) => res.render('notfound'))
