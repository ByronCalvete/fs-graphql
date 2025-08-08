const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 5
  },
  published: {
    type: Number,
    minLength: 4
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String }
  ]
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
