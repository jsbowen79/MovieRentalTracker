const router = require('express').Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    message: 'Endpoint not implemented',
  });
};

router.post('/', notImplemented);
router.put('/:userId', notImplemented);
router.get('/', notImplemented);
router.get('/:userId', notImplemented);
router.delete('/:userId', notImplemented);

module.exports = router;
