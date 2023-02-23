const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const config = require('../../config/index');

const AUTH_HEADER = 'Authorization';

const authenticate = async (req, res, next) => {
  try {
    const authToken = req.get(AUTH_HEADER).split(' ')[1]
    const decodedToken = jwt.verify(authToken, config.default.secretPublic);
    if (decodedToken.user) {
      req.user = decodedToken.user;
    }
    return next(new createError.Unauthorized());
  } catch (error) {
    return next(new createError.Unauthorized());
  }
};

module.exports = authenticate;
