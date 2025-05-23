const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: "未提供token!"
    });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), config.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({
      message: "未授权!"
    });
  }
};

const authMiddleware = {
  verifyToken
};

module.exports = authMiddleware; 