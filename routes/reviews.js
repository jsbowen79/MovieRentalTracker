const router = require('express').Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    message: 'Endpoint not implemented',
  });
};

router.post('/:movieId', notImplemented);
router.get('/:movieId', notImplemented);
router.delete('/:movieId', notImplemented);

module.exports = router;
