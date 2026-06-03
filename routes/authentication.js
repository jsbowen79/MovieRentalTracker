const router = require('express').Router();
const passport = require('passport');

// GitHub authentication route
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

// GitHub callback route
router.get(
  '/github/callback',

  passport.authenticate('github', {
    failureRedirect: '/',
  }),

  (req, res) => {
    res.json({
      message: 'GitHub login successful',
      user: req.user,
    });
  }
);

module.exports = router;
