jest.mock('../../models/movieInformation', () => ({
  getAllMovies: jest.fn(),
  getMovieById: jest.fn(),
}));

const movieInfoModel = require('../../models/movieInformation');

const {
  getAllMovies,
  getMovieById,
} = require('../../controllers/movieInformation');

const UserDataError = require('../../errors/UserDataError');
const NotFoundError = require('../../errors/NotFoundError');
const AppError = require('../../errors/AppError');

describe('getAllMovies', () => {
  test('returns all movies', async () => {
    const movies = [
      {
        title: 'Jaws',
        genre: 'Thriller',
      },
      {
        title: 'Star Wars',
        genre: 'Sci-Fi',
      },
    ];

    movieInfoModel.getAllMovies.mockResolvedValue(movies);

    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await getAllMovies(req, res, next);

    expect(movieInfoModel.getAllMovies).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(movies);

    expect(next).not.toHaveBeenCalled();
  });

  test('calls next with AppError when getAllMovies fails', async () => {
    movieInfoModel.getAllMovies.mockRejectedValue(new Error('Database Down'));

    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await getAllMovies(req, res, next);

    expect(next).toHaveBeenCalled();

    const errorPassed = next.mock.calls[0][0];

    expect(errorPassed).toBeInstanceOf(AppError);

    expect(errorPassed.message).toBe('Failed to retrieve movies');
  });
});

describe('getMovieById', () => {
  (test('returns movie by id', async () => {
    const movie = {
      _id: '6a232fa1bb91bec5e1da0022',
      title: 'Jaws',
      genre: 'Thriller',
    };

    movieInfoModel.getMovieById.mockResolvedValue(movie);

    const req = {
      params: {
        id: '6a232fa1bb91bec5e1da0022',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await getMovieById(req, res, next);

    expect(movieInfoModel.getMovieById).toHaveBeenCalledWith(
      '6a232fa1bb91bec5e1da0022'
    );

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(movie);

    expect(next).not.toHaveBeenCalled();
  }),
    test('calls next with UserDataError when id is invalid', async () => {
      const req = {
        params: {
          id: 'bad-id',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await getMovieById(req, res, next);

      expect(next).toHaveBeenCalled();

      const errorPassed = next.mock.calls[0][0];

      expect(errorPassed).toBeInstanceOf(UserDataError);

      expect(errorPassed.message).toBe('Invalid movie ID');

      expect(movieInfoModel.getMovieById).not.toHaveBeenCalled();
    }),
    test('calls next with NotFoundError when movie does not exist', async () => {
      movieInfoModel.getMovieById.mockResolvedValue(null);

      const req = {
        params: {
          id: '6a232fa1bb91bec5e1da0022',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await getMovieById(req, res, next);

      expect(next).toHaveBeenCalled();

      const errorPassed = next.mock.calls[0][0];

      expect(errorPassed).toBeInstanceOf(NotFoundError);

      expect(errorPassed.message).toBe('Movie not found');
    }),
    test('calls next with AppError when database throws', async () => {
      movieInfoModel.getMovieById.mockRejectedValue(new Error('Database Down'));

      const req = {
        params: {
          id: '6a232fa1bb91bec5e1da0022',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await getMovieById(req, res, next);

      expect(next).toHaveBeenCalled();

      const errorPassed = next.mock.calls[0][0];

      expect(errorPassed).toBeInstanceOf(AppError);

      expect(errorPassed.message).toBe('Failed to retrieve movie');
    }));
});
