const router = require('express').Router();
const {
  validateNew,
  validateUpdate,
  validUserRules,
  updateUserRules,
} = require('../controllers/users_validator');
const asyncHandler = require('../errors/AsyncHandler');
const requireAuth = require('../middleware/requireAuth.js');
const authorizeUser = require('../middleware/authorizeUser.js');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

router.post(
  '/',
  authorizeUser('admin'),
  validUserRules(),
  validateNew,
  asyncHandler(createUser)
);
router.put(
  '/:userId',
  authorizeUser('admin'),
  updateUserRules(),
  validateUpdate,
  asyncHandler(updateUser)
);
router.get('/', authorizeUser('admin'), asyncHandler(getAllUsers));
router.get('/:userId', requireAuth, asyncHandler(getUserById));
router.delete('/:userId', authorizeUser('admin'), asyncHandler(deleteUser));

// I will use this when authentication is merged and ready to use:
// router.delete('/:userId', auth, authorize('admin'), deleteUser);

module.exports = router;
