jest.mock('../../models/users', () => ({
  getUsersCollection: jest.fn(),
}));

const { getUsersCollection } = require('../../models/users');
const { ObjectId } = require('mongodb');

const {
  getAllUsers,
  getUserById,
} = require('../../controllers/users');

const NotFoundError = require('../../errors/NotFoundError');
const MongoDBConnectionError = require('../../errors/MongoDBConnectionError');

describe('getAllUsers', () => {
 test('getAllUsers returns all users', async () => {
  const users = [
    { userName: 'John' },
    { userName: 'Harry' },
  ];

  const mockToArray = jest.fn().mockResolvedValue(users);

  const mockCollection = {
    find: jest.fn(() => ({
      toArray: mockToArray,
    })),
  };

  getUsersCollection.mockResolvedValue(mockCollection);

  const req = {};

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await getAllUsers(req, res);

  expect(getUsersCollection).toHaveBeenCalledTimes(1);

  expect(res.status).toHaveBeenCalledWith(200);

  expect(res.json).toHaveBeenCalledWith(users);
});


test('getAllUsers throws NotFoundError when no users exist', async () => {
  const mockCollection = {
    find: jest.fn(() => ({
      toArray: jest.fn().mockResolvedValue([]),
    })),
  };

  getUsersCollection.mockResolvedValue(mockCollection);

  const req = {};

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(
    getAllUsers(req, res)
  ).rejects.toThrow(NotFoundError);
});


 test('getAllUsers throws MongoDBConnectionError when database fails', async () => {
  const mockCollection = {
    find: jest.fn(() => ({
      toArray: jest.fn().mockRejectedValue(
        new Error('DB Down')
      ),
    })),
  };

  getUsersCollection.mockResolvedValue(mockCollection);

  const req = {};

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(
    getAllUsers(req, res)
  ).rejects.toThrow(MongoDBConnectionError);
});
});

describe('getUserById', () => {
  test('getUserById returns a user', async () => {
  const user = {
    _id: new ObjectId('6a232fa1bb91bec5e1da0022'),
    userName: 'John',
  };

  const mockFindOne = jest.fn().mockResolvedValue(user);

  const mockCollection = {
    findOne: mockFindOne,
  };

  getUsersCollection.mockResolvedValue(mockCollection);

  const req = {
    params: {
      userId: '6a232fa1bb91bec5e1da0022',
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await getUserById(req, res);

  expect(mockFindOne).toHaveBeenCalledWith({
    _id: new ObjectId('6a232fa1bb91bec5e1da0022'),
  });

  expect(res.status).toHaveBeenCalledWith(200);

  expect(res.json).toHaveBeenCalledWith(user);
});
}),
test('getUserById throws NotFoundError when user does not exist', async () => {
  const mockCollection = {
    findOne: jest.fn().mockResolvedValue(null),
  };

  getUsersCollection.mockResolvedValue(mockCollection);

  const req = {
    params: {
      userId: '6a232fa1bb91bec5e1da0022',
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(
    getUserById(req, res)
  ).rejects.toThrow(NotFoundError);
});