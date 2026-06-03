const auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Access denied. Please log in.',
    });
  }
  next();
};

module.exports = auth;
