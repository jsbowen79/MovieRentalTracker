const movieInfoModel = require('../models/movieInformation');

const getAllMovies = async (req, res, next) => {
    try {
        const movies = await movieInfoModel.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMovies
}