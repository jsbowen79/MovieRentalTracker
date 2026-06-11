const rentedModel = require('../models/rentedMovies');
const UserDataError = require('../errors/UserDataError');
const { ObjectId } = require('mongodb');

async function rentMovie(req, res) {
  const dateRented = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  const dateReturned = null;
  const out = true;
  const userId = new ObjectId(req.params.userId);
  const movieId = new ObjectId(req.body.movieId);
  if (userId && movieId) {
    const response = await rentedModel.insertRentedMovie(
      userId,
      movieId,
      dateRented,
      dateReturned,
      out
    );
    res.json(response);
  } else {
    throw new UserDataError('Please provide the movieId and the userId');
  }
}

async function updateTransaction(req, res) {
 
  const updates = { ...req.body };
  if (updates.userId != undefined) {
    updates.userId = new ObjectId(updates.userId);
  }
  if (updates.movieId != undefined) {
    updates.movieId = new ObjectId(updates.movieId);
  }
  if (updates.out != undefined) {
    updates.out = Boolean(updates.out);
  }

  const transId = new ObjectId(req.params.transId);
  const result = await rentedModel.enterUpdatedTransaction(transId, updates);
  res.json(result);
}

async function listRentedMovies(req, res) {
  const response = await rentedModel.getAllRentals();
  res.json(response);
}
async function listRentedByUser(req, res) {
  let all = true;
  if (req.originalUrl.includes('out')) {
    all = false;
  }
  if (req.params.userId) {
    const userId = new ObjectId(req.params.userId);
    console.log('All: ', all);
    const result = await rentedModel.listRentedMovies(userId, all);
    res.json(result);
  } else {
    throw new UserDataError('You must provide a userId.');
  }
}

async function deleteTransaction(req, res) {
  if (req.params.transId) {
    const transId = new ObjectId(req.params.transId);
    const response = await rentedModel.removeTransaction(transId);
    res.json(response);
  } else {
    throw new UserDataError(
      'You must include a transaction Id to delete a transaction.'
    );
  }
}

module.exports = {
  rentMovie,
  updateTransaction,
  listRentedMovies,
  listRentedByUser,
  deleteTransaction,
};
