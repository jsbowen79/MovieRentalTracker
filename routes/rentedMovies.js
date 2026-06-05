const router = require('express').Router();
const asyncHandler = require('../errors/AsyncHandler.js');
const rentController = require('../controllers/rentedMovies.js');
const requireAuth = require('../middleware/requireAuth.js');
const authorizeUser = require('../middleware/authorizeUser.js');

router.post('/:userId', requireAuth, asyncHandler(rentController.rentMovie));
router.put(
  '/:transId',
  requireAuth,
  asyncHandler(rentController.updateTransaction)
);
router.get('/', requireAuth, asyncHandler(rentController.listRentedMovies));
router.get(
  '/:userId',
  authorizeUser('admin'),
  asyncHandler(rentController.listRentedByUser)
);
router.get(
  '/out/:userId',
  authorizeUser('admin'),
  asyncHandler(rentController.listRentedByUser)
);
router.delete(
  '/:transId',
  requireAuth,
  asyncHandler(rentController.deleteTransaction)
);

module.exports = router;
