const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler.js');

const notImplemented = (req, res) => {
  res.status(501).json({
    message: 'Endpoint not implemented',
  });
};

router.post('/:userId', notImplemented);
router.put('/:userId', notImplemented);
router.get('/', notImplemented);
router.get('/:userId', notImplemented);
router.get('/out/:userId', notImplemented);
router.delete('/:transId', notImplemented);

module.exports = router;
