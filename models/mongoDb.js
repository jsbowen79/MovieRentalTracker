const { MongoClient } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URI);
const MongoDBConnectionError = require('../errors/MongoDBConnectionError');

let db;

async function connectDB() {
  if (!db) {
    try {
      console.log('initializing database: ');
      await client.connect();
      db = client.db();
      console.log('Connected to MongoDB');

      return db;
    } catch {
      throw new MongoDBConnectionError('Mongo DB failed to connect.');
    }
  } else {
    return db;
  }
}

async function getDB() {
  if (!db) {
    await connectDB();
  }
  return db;
}

module.exports = { connectDB, getDB };
