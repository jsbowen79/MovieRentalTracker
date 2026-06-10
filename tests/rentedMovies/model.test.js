jest.mock('../../models/mongoDb', () => ({
  getDB: jest.fn(),
}));
const MongoDBConnectionError = require('../../errors/MongoDBConnectionError');
const NotFoundError = require('../../errors/NotFoundError');

const mongoDb = require('../../models/mongoDb');
const rentedModel = require('../../models/rentedMovies');

const mockToArray = jest.fn();
const mockFind = jest.fn(() => ({
  toArray: mockToArray,
}));

const mockCollection = jest.fn(() => ({
  find: mockFind,
}));

const mockDb = {
  collection: mockCollection,
};

beforeEach(() => {
  jest.clearAllMocks();
  mongoDb.getDB.mockResolvedValue(mockDb);
});

describe('test get routes in rentedMovies model', () => {
  test('getAllRentals returns data', async () => {
    const fakeData = [{ title: 'Jaws' }];
    mockToArray.mockResolvedValue(fakeData);

    const result = await rentedModel.getAllRentals();
    expect(result).toEqual(fakeData);
    expect(mockCollection).toHaveBeenCalledWith('rentedMovies');
  });

  test('getAllRentals throws NotFoundError when empty', async () => {
    mockToArray.mockResolvedValue([]);
    await expect(rentedModel.getAllRentals()).rejects.toThrow(
      'There are no entries in the Database.'
    );
  });

  test('listRentedMovies returns user rentals (all=true)', async () => {
    const fakeData = [{ title: 'Jaws' }];
    mockToArray.mockResolvedValue(fakeData);
    const result = await rentedModel.listRentedMovies('user123', true);
    expect(result).toEqual(fakeData);
    expect(mockCollection).toHaveBeenCalledWith('rentedMovies');
    expect(mockFind).toHaveBeenCalledWith({
      userId: 'user123',
    });
  });

  test('listRentedMovies returns only out rentals', async () => {
    const fakeData = [{ title: 'Jaws' }];
    mockToArray.mockResolvedValue(fakeData);
    const result = await rentedModel.listRentedMovies('user123', false);
    expect(mockFind).toHaveBeenCalledWith({
      userId: 'user123',
      out: true,
    });
    expect(result).toEqual(fakeData);
  });

  test('getAllRentals throws notFoundError if empty', async () => {
    const fakeData = [];
    mockToArray.mockResolvedValue(fakeData);

    await expect(rentedModel.getAllRentals()).rejects.toThrow(NotFoundError);
  });

  test('getAllRentals throws mongoDBConnectionError with DB failure.', async () => {
    mockToArray.mockRejectedValue(new Error('DB Down'));

    await expect(rentedModel.getAllRentals()).rejects.toThrow(
      MongoDBConnectionError
    );
  });

  test('listRentedMovies throws NotFoundError when no movies are returned(all = false)', async () => {
    const fakeData = [];
    mockToArray.mockResolvedValue(fakeData);
    await expect(
      rentedModel.listRentedMovies('user123', false)
    ).rejects.toThrow(NotFoundError);
  });

  test('listRentedMovies throws MongoDBConnectionError when database fails (all= false)', async () => {
    mockToArray.mockRejectedValue(new Error('DB Down'));
    await expect(
      rentedModel.listRentedMovies('user123', false)
    ).rejects.toThrow(MongoDBConnectionError);
  });

  test('listRentedMovies throws NotFoundError when no movies are returned(all = true)', async () => {
    const fakeData = [];
    mockToArray.mockResolvedValue(fakeData);
    await expect(rentedModel.listRentedMovies('user123', true)).rejects.toThrow(
      NotFoundError
    );
  });

  test('listRentedMovies throws MongoDBConnectionError when database fails (all= true)', async () => {
    mockToArray.mockRejectedValue(new Error('DB Down'));
    await expect(rentedModel.listRentedMovies('user123', true)).rejects.toThrow(
      MongoDBConnectionError
    );
  });
});
