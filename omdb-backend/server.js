const express = require("express");
const cors = require("cors"); // Import the CORS middleware

const app = express();

// Use CORS with default settings (allows all origins)
app.use(cors());

// Your existing routes and setup code
const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
