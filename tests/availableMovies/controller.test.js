jest.mock('../../models/mongoDb', () => ({
  getDB: jest.fn(),
}));

const { getDB } = require('../../models/mongoDb');
const {
  getAllMovies,
  getByGenre,
} = require('../../controllers/availableMovies');

describe('getAllMovies', () => {
  test('returns all movies', async () => {
    const movies = [{ title: 'Inception' }, { title: 'Interstellar' }];

    const mockToArray = jest.fn().mockResolvedValue(movies);

    const mockFind = jest.fn(() => ({
      toArray: mockToArray,
    }));

    const mockCollection = jest.fn(() => ({
      find: mockFind,
    }));

    const mockDb = {
      collection: mockCollection,
    };

    getDB.mockResolvedValue(mockDb);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllMovies(req, res);

    expect(getDB).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      count: movies.length,
      data: movies,
    });
  });
});

describe('getByGenre', () => {
  test('returns movies filtered by genre', async () => {
    const movies = [
      { title: 'Inception', genre: 'Sci-Fi' },
      { title: 'Interstellar', genre: 'Sci-Fi' },
    ];

    const mockToArray = jest.fn().mockResolvedValue(movies);

    const mockFind = jest.fn(() => ({
      toArray: mockToArray,
    }));

    const mockCollection = jest.fn(() => ({
      find: mockFind,
    }));

    const mockDb = {
      collection: mockCollection,
    };

    getDB.mockResolvedValue(mockDb);

    const req = {
      params: {
        genreId: 'Sci-Fi',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getByGenre(req, res);

    expect(getDB).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({
      genre: 'Sci-Fi',
    });

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      count: movies.length,
      data: movies,
    });
  });
});
