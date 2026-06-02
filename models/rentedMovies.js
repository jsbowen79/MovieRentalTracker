const { getDB } = require('./mongoDb.js');
const MongoDBConnectionError = require('../errors/mongoDBConnectionError.js');
const NotFoundError = require('../errors/NotFoundError.js');
const UserDataError = require('../errors/userDataError.js');
const AppError = require('../errors/appError.js');

async function insertRentedMovie(
  userId,
  movieId,
  dateRented,
  dateReturned,
  out
) {
  const db = await getDB();
  let username;
  let movieName;

  try {
    const usernameRecord = await db
      .collection('users')
      .findOne({ userId: userId });

    if (usernameRecord != null) {
      username = usernameRecord.name;
    } else {
      throw new NotFoundError(
        'No user matching that userId exists.  Please try again.'
      );
    }
  } catch (error) {
    throw new MongoDBConnectionError(
      `There was a problem retrieving the user from the database.  Please try again. ${error}`
    );
  }

  try {
    const movieRecord = await db
      .collection('movieInfo')
      .findOne({ _id: movieId });

    if (movieRecord != null) {
      if (movieRecord.out == 'true') {
        throw new UserDataError('The requested movie is not available');
      } else {
        movieName = movieRecord.title;
      }
    } else {
      new NotFoundError('The requested movie does not exist in the database.');
    }
  } catch (error) {
    throw new MongoDBConnectionError(
      `There was a problem retrieving with the database.  Please try again. ${error}`
    );
  }
  try {
    const entry = { userId, movieId, dateRented, dateReturned, out };
    const data = await db.collection('rentedMovies').insertOne(entry);
    console.log('Data: ', data);
    const transId = data.insertedId.toString();
    const successString = `Congratulations ${username} has successfully rented ${movieName}.  Your transaction id is ${transId}.`;
    return successString;
  } catch (error) {
    throw new MongoDBConnectionError(
      `There was a problem saving to the database.  Please try again.  ${error}`
    );
  }
}

async function enterUpdatedTransaction(transId, updates) {
  const db = await getDB();
  if (await db.collection('rentedMovies').findOne({ _id: transId })) {
    try {
      const result = await db
        .collection('rentedMovies')
        .updateOne({ _id: transId }, { $set: updates });
      return result;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new MongoDBConnectionError(
          'There was a problem with the database.  Update failed.'
        );
      }
    }
  } else {
    throw new UserDataError(
      'There is no transaction with that id.  Please try again'
    );
  }
}

async function getAllRentals() {
  const db = await getDB();
  try {
    const response = await db.collection('rentedMovies').find({}).toArray();
    if (response.length > 0) {
      return response;
    } else {
      throw new NotFoundError('There are no entries in the Database.');
    }
  } catch (error) {
    throw new MongoDBConnectionError(
      `There was a problem with the database.  Please try again. ${error}`
    );
  }
}

async function listRentedMovies(userId, all) {
  const db = await getDB();
  console.log('all: ', all, 'userid: ', userId);
  if (all) {
    try {
      const result = await db
        .collection('rentedMovies')
        .find({ userId: userId })
        .toArray();
      console.log('result: ', result);
      if (result.length > 0) {
        return result;
      } else {
        throw new NotFoundError('This user has rented no movies.');
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new MongoDBConnectionError(
        'There was a problem connecting with the database.'
      );
    }
  } else {
    try {
      const result = db
        .collection('rentedMovies')
        .find({ userId: userId, out: true })
        .toArray();
      if (result.length > 0) {
        return result;
      } else {
        throw new NotFoundError('This user has no movies currently rented.');
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new MongoDBConnectionError(
        'There was a problem connecting with the database.'
      );
    }
  }
}

async function removeTransaction(transId) {
  const db = await getDB();
  if (await db.collection('rentedMovies').findOne({ _id: transId })) {
    try {
      const response = db
        .collection('rentedMovies')
        .deleteOne({ _id: transId });
      return response;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new MongoDBConnectionError(
          'There was a problem with the Database.  Please try again.'
        );
      }
    }
  } else {
    throw new NotFoundError('No transaction with that transaction Id exists.');
  }
}

module.exports = {
  insertRentedMovie,
  enterUpdatedTransaction,
  getAllRentals,
  listRentedMovies,
  removeTransaction,
};
