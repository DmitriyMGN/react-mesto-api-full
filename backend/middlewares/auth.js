const jwt = require('jsonwebtoken');
const { AutorizationError } = require('../errors/AutorizationError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    console.log(NODE_ENV);
    console.log(JWT_SECRET);
    payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AutorizationError('Необходима авторизация!'));
  }

  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
