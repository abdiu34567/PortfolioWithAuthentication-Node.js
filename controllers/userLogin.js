const Bcrypt = require('bcrypt')
const User = require('../model/user')

const mongoose = require('mongoose')

async function connectMongoose() {
  await mongoose.connect('url', {
    useNewUrlParser: true,
  })
}

connectMongoose().catch((err) => alert('Slow Connection'))

module.exports = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email }, (error, user) => {
    if (error) {
      return res.render('login', {
        errors: "Something Won't Wrong, Please Try Again",
      })
    } else if (user) {
      Bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id
          req.session.email = user.email
          req.session.name = user.first + ' ' + user.last
          res.redirect('/')
        } else {
          req.session.email = req.body.email
          return res.redirect('/auth/login')
        }
      })
    } else {
      req.session.email = req.body.email
      return res.redirect('/auth/login')
    }
  })
}
