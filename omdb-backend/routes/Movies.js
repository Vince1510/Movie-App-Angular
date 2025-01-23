// Import required modules
const express = require("express"); // Express framework for creating routes
const axios = require("axios"); // Axios for making HTTP requests
const router = express.Router(); // Create a new router instance

// API key for the OMDB API
const OMDB_API_KEY = "ddf53561";
// Base URL for the OMDB API with the API key appended
const BASE_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

// Route to search for a movie by its title
// GET /movies/search?title=<movie_title>
router.get("/search", async (req, res) => {
  const { title } = req.query; // Extract 'title' from the query parameters

  // If no title is provided, return a 400 status with an error message
  if (!title) {
    return res.status(400).json({ error: "Movie title is required" });
  }

  try {
    // Make an API request to OMDB to fetch movie details by title
    const response = await axios.get(`${BASE_URL}&t=${title}`);
    const movie = response.data;

    // If OMDB responds with "False", it means the movie wasn't found
    if (movie.Response === "False") {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Return the relevant movie details in the response
    res.json({
      title: movie.Title,
      description: movie.Plot,
      imdbId: movie.imdbID,
      category: movie.Genre,
      image: movie.Poster,
    });
  } catch (error) {
    // Handle any errors during the request process
    res.status(500).json({ error: "Error fetching movie data" });
  }
});

// Route to fetch movies by a specific genre
// GET /movies/genre?genre=<genre_name>
router.get("/genre", async (req, res) => {
  const { genre } = req.query; // Extract 'genre' from the query parameters

  // If no genre is provided, return a 400 status with an error message
  if (!genre) {
    return res.status(400).json({ error: "Genre is required" });
  }

  try {
    // Make an API request to OMDB to fetch movies by genre
    const response = await axios.get(`${BASE_URL}&s=${genre}&type=movie`);
    const movies = response.data.Search;

    // If no movies are found, return a 404 status with an error message
    if (!movies) {
      return res.status(404).json({ error: "No movies found in this genre" });
    }

    // Format the movie details to return only the necessary fields
    const formattedMovies = movies.map((movie) => ({
      title: movie.Title,
      imdbId: movie.imdbID,
      image: movie.Poster,
    }));

    // Return the list of movies
    res.json(formattedMovies);
  } catch (error) {
    // Handle any errors during the request process
    res.status(500).json({ error: "Error fetching movies by genre" });
  }
});

// Route to get a list of the best movies of all time
// GET /movies/best
router.get("/best", async (req, res) => {
  try {
    // Predefined list of best movies
    const bestMovies = [
      "The Godfather",
      "The Dark Knight",
      "Inception",
      "The Shawshank Redemption",
    ];

    // Create an array of promises to fetch details of each best movie
    const moviePromises = bestMovies.map((title) =>
      axios.get(`${BASE_URL}&t=${title}`)
    );

    // Wait for all the movie details to be fetched in parallel
    const movieResponses = await Promise.all(moviePromises);

    // Format the movie details to return only the necessary fields
    const formattedMovies = movieResponses.map((response) => ({
      title: response.data.Title,
      imdbId: response.data.imdbID,
      category: response.data.Genre,
      description: response.data.Plot,
      image: response.data.Poster,
    }));

    // Return the list of best movies
    res.json(formattedMovies);
  } catch (error) {
    // Handle any errors during the request process
    res.status(500).json({ error: "Error fetching best movies" });
  }
});

// Export the router to be used in other files
module.exports = router;
