const { getDB } = require('./mongoDb');

const getUsersCollection = async () => {
    const db = await getDB();
    return db.collection('users');
};

module.exports = {
    getUsersCollection
};