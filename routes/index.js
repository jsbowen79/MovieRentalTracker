const routes = require('express').Router();
const asyncHandler = require('../errors/asyncHandler.js');
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

module.exports = routes;
