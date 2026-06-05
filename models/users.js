const { getDB } = require('./mongoDb');

const getUsersCollection = async () => {
  const db = await getDB();
  return db.collection('users');
};

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
  },
});
const User = mongoose.model('User', userSchema);
module.exports = { User, getUsersCollection };
