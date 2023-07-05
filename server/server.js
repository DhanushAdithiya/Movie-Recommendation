const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/movie-recommendation")
  .then(() => console.log("DB CONNECTED"));

const movieRouter = require("./routes/movies");

app.use("/movies", movieRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Started at " + process.env.PORT);
});
