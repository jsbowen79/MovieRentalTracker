const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

router.post('/', createUser);
router.put('/:userId', updateUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUser);

// I will use this when authentication is merged and ready to use:
// router.delete('/:userId', auth, authorize('admin'), deleteUser);

module.exports = router;