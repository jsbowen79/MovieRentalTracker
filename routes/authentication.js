const router = require('express').Router();
const asyncHandler = require('../errors/asyncHandler.js');

const notImplemented = (req, res) => {
  res.status(501).json({
    message: 'Endpoint not implemented',
  });
};

router.get('/github', notImplemented);
router.get('/github/redirect', notImplemented);
router.get('/logout', notImplemented);

module.exports = router;
