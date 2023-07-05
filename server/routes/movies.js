
const express = require("express");
const Movies = require("../models/movies.models");
const router = express.Router();

// const fetch = require("node-fetch");

router.route("/add").post((req, res) => {
  const id = req.body.id;
  const title = req.body.title;

  const newMovie = new Movies({ id, title });

  newMovie
    .save()
    .then(() => console.log(newMovie))
    .then(() => res.json("Movie Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/find").post((req, res) => {
  const movie = req.body.title;

  Movies.find({ title: movie })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/findId").post((req, res) => {
  const movie = req.body.id;

  Movies.find({ id: movie })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  Movies.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/recommend", getMovies);

function getMovies(req, res) {
  const spawn = require("child_process").spawn;
  const id = parseInt(req.query.id);

  const process = spawn("python", ["../server/python/test.py", id.toString()]);

  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });

  process.stderr.on("data", function (data) {
    console.error(data.toString());
    res.status(500).send("An error occurred.");
  });

  process.on("error", function (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  });
}
module.exports = router;
