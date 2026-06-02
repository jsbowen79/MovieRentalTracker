const mongobd = require('./mongoDb')

const getAllMovies = async () => {
    try {
        return await mongobd
            .getDB()
            .collection('movieInfo')
            .find()
            .toArray();
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllMovies
}
