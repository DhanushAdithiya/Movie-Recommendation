<<<<<<< HEAD
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieList = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
});

const Movies = mongoose.model("MovieList", movieList);
module.exports = Movies;
=======
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieList = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
});

const Movies = mongoose.model("MovieList", movieList);
module.exports = Movies;
>>>>>>> origin/main
