const { ObjectId } = require('mongodb');
const { getUsersCollection } = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const UserDataError = require('../errors/UserDataError');
const MongoDBConnectionError = require('../errors/MongoDBConnectionError');
const AppError = require('../errors/AppError');

// Get all of the customers' information

const getAllUsers = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const usersCollection = await getUsersCollection();
    const users = await usersCollection.find().toArray();
    if (users.length == 0) {
      throw new NotFoundError('There are no users in the Database.');
    }
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new MongoDBConnectionError(
        `There was a problem with the database.  Please try again. ${error}`
      );
    }
  }
};

// Get one customer by ID

const getUserById = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const usersCollection = await getUsersCollection();

    if (!ObjectId.isValid(req.params.userId)) {
      throw new UserDataError('userId is not valid');
    }

    const user = await usersCollection.findOne({
      _id: new ObjectId(req.params.userId),
    });

    if (!user) {
      throw new NotFoundError('User could not be found');
    }

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new MongoDBConnectionError(
        'There was a problem with the database.'
      );
    }
  }
};

// Create a new customer's user

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const usersCollection = await getUsersCollection();

    const user = {
      githubId: req.body.githubId,
      username: req.body.username,
      profileUrl: req.body.profileUrl,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      role: req.body.role,
    };

    const result = await usersCollection.insertOne(user);

    res.status(201).json({
      githubId: user.githubId,
      _id: result.insertedId,
      username: user.customerName,
      profileUrl: user.profileUrl,
      address: user.address,
      phone: user.phone,
      email: user.email,
      role: user.role,
    });
  } catch {
    throw new MongoDBConnectionError('There was a Problem with the database.');
  }
};

// Update a customer's information

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const usersCollection = await getUsersCollection();

    const updates = { ...req.body };
    const userId = new ObjectId(req.params.userId);

    const result = await usersCollection.updateOne(
      { _id: userId },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      throw new NotFoundError('User could not be found');
    }

    const updatedUser = await usersCollection.findOne({ _id: userId });

    return res.status(200).json({
      message: 'User has been updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new MongoDBConnectionError(
        'There was a problem with the database.'
      );
    }
  }
};

// Delete a customer's user

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const usersCollection = await getUsersCollection();

    if (!ObjectId.isValid(req.params.userId)) {
      throw new UserDataError('userId is not valid');
    }

    const userId = new ObjectId(req.params.userId);

    const result = await usersCollection.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return new NotFoundError('User could not be found');
    }

    return res
      .status(200)
      .json({ message: 'User has been deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new MongoDBConnectionError('There was a problem with the Database');
    }
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
