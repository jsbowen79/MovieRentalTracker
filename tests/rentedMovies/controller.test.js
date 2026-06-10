jest.mock('../../models/rentedMovies', () => ({
  getAllRentals: jest.fn(),
  listRentedMovies: jest.fn(),
}));
const rentedModel = require('../../models/rentedMovies.js');
const { listRentedMovies } = require('../../controllers/rentedMovies.js');
const { listRentedByUser } = require('../../controllers/rentedMovies.js');

describe('listRentedMovies', () => {
  test('ListRentedMovies calls controller', async () => {
    const rentals = [{ title: 'Jaws' }, { title: 'Frozen' }];
    rentedModel.getAllRentals.mockResolvedValue(rentals);
    const req = {};
    const res = {
      json: jest.fn(),
    };
    await listRentedMovies(req, res);

    expect(rentedModel.getAllRentals).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(rentals);
  });
});

describe('listRentedByUser', () => {
  test('returns all rentals when URL does not contain "out".', async () => {
    const rentals = [{ title: 'Jaws' }, { title: 'Frozen' }];
    rentedModel.listRentedMovies.mockResolvedValue(rentals);
    const req = {
      originalUrl: '/rentals/user/123',
      params: {
        userId: '507f1f77bcf86cd799439011',
      },
    };
    const res = {
      json: jest.fn(),
    };

    await listRentedByUser(req, res);

    expect(rentedModel.listRentedMovies).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(rentals);
  });

  test('returns out rentals when URL includes "out"', async () => {
    const rentals = [{ title: 'Jaws' }, { title: 'Frozen' }];
    rentedModel.listRentedMovies.mockResolvedValue(rentals);
    const req = {
      originalUrl: '/rentals/user/123/out',
      params: {
        userId: '507f1f77bcf86cd799439011',
      },
    };
    const res = {
      json: jest.fn(),
    };

    await listRentedByUser(req, res);

    expect(rentedModel.listRentedMovies).toHaveBeenCalledTimes(1);
    expect(rentedModel.listRentedMovies).toHaveBeenCalledWith(
      expect.any(Object),
      false
    );
    expect(res.json).toHaveBeenCalledWith(rentals);
  });

  test('throws error when userId is missing', async () => {
    const req = {
      originalUrl: '/rentals/user',
      params: {},
    };
    const res = {
      json: jest.fn(),
    };
    await expect(listRentedByUser(req, res)).rejects.toThrow(
      'You must provide a userId.'
    );
  });
});
