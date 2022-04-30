const User = require('../model/user.js')
const path = require('path')

const mongoose = require('mongoose')

module.exports = (req, res) => {
  if (req.body.password !== req.body.confirmpassword) {
    req.session.password = false
    req.session.data = {
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
    }
    return res.redirect('/auth/register')
  }

  async function connectMongoose() {
    await mongoose.connect('url///', {
      useNewUrlParser: true,
    })
  }
  connectMongoose().catch((err) => alert('Slow Connection'))

  User.create(req.body, (error, user) => {
    if (error) {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      )

      req.flash('validationErrors', validationErrors)
      req.flash('data', req.body)
      return res.redirect('/auth/register')
    }
    res.redirect('/auth/login')
  })
}
