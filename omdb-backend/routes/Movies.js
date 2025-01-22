// Movies.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const OMDB_API_KEY = "ddf53561";
const BASE_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

// Route to search for a movie by title
router.get("/search", async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Movie title is required" });
  }

  try {
    const response = await axios.get(`${BASE_URL}&t=${title}`);
    const movie = response.data;

    if (movie.Response === "False") {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json({
      title: movie.Title,
      description: movie.Plot,
      imdbId: movie.imdbID,
      category: movie.Genre,
      image: movie.Poster,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching movie data" });
  }
});

// Route to fetch movies by genre
router.get("/genre", async (req, res) => {
  const { genre } = req.query;

  if (!genre) {
    return res.status(400).json({ error: "Genre is required" });
  }

  try {
    const response = await axios.get(`${BASE_URL}&s=${genre}&type=movie`);
    const movies = response.data.Search;

    if (!movies) {
      return res.status(404).json({ error: "No movies found in this genre" });
    }

    const formattedMovies = movies.map((movie) => ({
      title: movie.Title,
      imdbId: movie.imdbID,
      image: movie.Poster,
    }));

    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movies by genre" });
  }
});

// Route to get best movies of all time
router.get("/best", async (req, res) => {
  try {
    // Define some best movies (you could also integrate with a real source of best movies)
    const bestMovies = [
      "The Godfather",
      "The Dark Knight",
      "Inception",
      "The Shawshank Redemption",
    ];

    const moviePromises = bestMovies.map((title) =>
      axios.get(`${BASE_URL}&t=${title}`)
    );
    const movieResponses = await Promise.all(moviePromises);

    const formattedMovies = movieResponses.map((response) => ({
      title: response.data.Title,
      imdbId: response.data.imdbID,
      category: response.data.Genre,
      description: response.data.Plot,
      image: response.data.Poster,
    }));

    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching best movies" });
  }
});

module.exports = router;
