import validator from 'validator';
import isEmpty from 'lodash.isempty';
import jwt from 'jsonwebtoken';
/* import isInt from 'validator/lib/isInt'; */

export default class Middleware {
  static isLoggedIn(req, res, next) {
    const token = req.body.token || req.query.token || req.get('Authorization').slice(7);
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'error',
          message: 'User not logged in'
        });
      }
      req.userId = decoded.id;
      return next();
    });
  }

  static validateUser(req, res, next) {
    const errors = {};
    const {
      email, password
    } = req.body;

    if (!email || (email && typeof email !== 'string')) {
      errors.email = 'Enter a valid email';
    }

    if (!password || (password && validator.isEmpty(password.trim()))) {
      errors.password = 'password cannot be empty';
    }

    if (isEmpty(errors)) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      errors
    });
  }
}
