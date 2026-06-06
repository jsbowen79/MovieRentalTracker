const routes = require('express').Router();
const AsyncHandler = require('../errors/AsyncHandler.js');
const usersRoute = require('./users.js');
const authenticationRoute = require('./authentication.js');
const availableMoviesRoute = require('./availableMovies.js');
const movieInformationRoute = require('./movieInformation.js');
const rentedMovieRoute = require('./rentedMovies.js');
const reviewsRoute = require('./reviews.js');

routes.use('/user', usersRoute);
routes.use('/auth', authenticationRoute);
routes.use('/movies', availableMoviesRoute);
routes.use('/rented', rentedMovieRoute);
routes.use('/info', movieInformationRoute);
routes.use('/review', reviewsRoute);
routes.get(
  '/',
  AsyncHandler(async (req, res) => {
    res.json({
      message: 'Welcome to the Movie Rental Tracker API',
    });
  })
);

module.exports = routes;
