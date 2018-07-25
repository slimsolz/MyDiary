import validator from 'validator';
import isEmpty from 'lodash.isempty';
import isInt from 'validator/lib/isInt';

export default class Middleware {
  static validateParams(req, res, next) {
    const reqId = req.params.id;
    const id = isInt(reqId);

    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid parameter'
      });
    }
    return next();
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
