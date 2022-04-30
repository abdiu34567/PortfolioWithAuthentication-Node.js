const mongoose = require('mongoose')
const Schema = mongoose.Schema

var uniqueValidator = require('mongoose-unique-validator')

const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  first: {
    type: String,
  },
  last: {
    type: String,
  },
  email: {
    unique: true,
    type: String,
  },
  password: {
    type: String,
  },
})

UserSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
  })
})

UserSchema.plugin(uniqueValidator)

// export model
const User = mongoose.model('user', UserSchema)
module.exports = User
