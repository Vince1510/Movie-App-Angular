// Import required modules
const express = require("express"); // Express framework for building the server
const cors = require("cors"); // CORS middleware for handling cross-origin requests

const app = express(); // Initialize Express app

// Enable CORS (Cross-Origin Resource Sharing) with default settings
// This allows your server to accept requests from any origin
app.use(cors());

// Import the movies router from the "routes/movies" file
const moviesRouter = require("./routes/movies");

// Set up the /movies route using the imported router
// All routes defined in "moviesRouter" will be prefixed with "/movies"
app.use("/movies", moviesRouter);

// Define the port on which the server will listen
// Use the environment variable PORT if available, otherwise fallback to port 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log a message when the server starts
});
