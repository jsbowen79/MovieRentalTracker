const router = require('express').Router();
const AsyncHandler = require('../errors/AsyncHandler.js');
const rentController = require('../controllers/rentedMovies.js');
const requireAuth = require('../middleware/requireAuth.js');
const authorizeUser = require('../middleware/authorizeUser.js');

router.post('/:userId', requireAuth, AsyncHandler(rentController.rentMovie));
router.put(
  '/:transId',
  requireAuth,
  AsyncHandler(rentController.updateTransaction)
);
router.get('/', requireAuth, AsyncHandler(rentController.listRentedMovies));
router.get(
  '/:userId',
  authorizeUser('admin'),
  AsyncHandler(rentController.listRentedByUser)
);
router.get(
  '/out/:userId',
  authorizeUser('admin'),
  AsyncHandler(rentController.listRentedByUser)
);
router.delete(
  '/:transId',
  requireAuth,
  AsyncHandler(rentController.deleteTransaction)
);

module.exports = router;
