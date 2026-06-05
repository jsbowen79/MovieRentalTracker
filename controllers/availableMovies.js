const getAllMovies = async (req, res) => {
  res.json({ message: "Get all movies working" });
};

const createMovie = async (req, res) => {
  res.json({ message: "Create movie working" });
};

const getByGenre = async (req, res) => {
  res.json({ message: "Get by genre working" });
};

const deleteMovie = async (req, res) => {
  res.json({ message: "Delete movie working" });
};

module.exports = {
  getAllMovies,
  createMovie,
  getByGenre,
  deleteMovie
};