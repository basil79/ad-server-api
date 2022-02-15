const jwt = require('jsonwebtoken');
const config = require('../config.json');

verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res
      .json({
        error: 'no token provided'
      });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
        .json({
          error: 'unauthorized!'
        });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
