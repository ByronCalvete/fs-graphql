const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3
  },
  favoriteGenre: {
    type: String,
    minLength: 4
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
