const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler.js');
const rentController = require('../controllers/rentedMovies.js');

router.post('/:userId', asyncHandler(rentController.rentMovie));
router.put('/:transId', asyncHandler(rentController.updateTransaction));
router.get('/', asyncHandler(rentController.listRentedMovies));
router.get('/:userId', asyncHandler(rentController.listRentedByUser));
router.get('/out/:userId', asyncHandler(rentController.listRentedByUser));
router.delete('/:transId', asyncHandler(rentController.deleteTransaction));

module.exports = router;
