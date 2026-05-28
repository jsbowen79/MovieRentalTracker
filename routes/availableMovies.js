const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler.js');

const notImplemented = (req, res) => {
  res.status(501).json({
    message: 'Endpoint not implemented',
  });
};

router.post('/', notImplemented);
router.get('/:genreId', notImplemented);
router.get('/', notImplemented);
router.delete('/:userId', notImplemented);

module.exports = router;
