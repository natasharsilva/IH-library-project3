const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The book title is required'],
    minlength: 1
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  images: [String],
  description: String,
  rating: Number,
  pages: Number,
  ISBN: {type: Number, minlength: 10},
  createdBy: {type: Schema.Types.ObjectId, ref: "User"},
  currentOwner: {type: Schema.Types.ObjectId, ref: "User"},
  status: { type: String, enum: ['Available', 'Unavailable'] },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;