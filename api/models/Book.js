import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: String,
  pages: Number,
  genre: String,
  cover: String,
  synopsis: String,
  year: Number,
  ISBN: String,
  author: {
    name: String,
    otherBooks: [String],
  },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = { Book };
