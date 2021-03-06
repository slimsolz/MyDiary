import validator from 'validator';
import isEmpty from 'lodash.isempty';
import jwt from 'jsonwebtoken';
import isInt from 'validator/lib/isInt';
import isEmail from 'validator/lib/isEmail';

export default class Middleware {
  static isLoggedIn(req, res, next) {
    const token = req.body.token || req.query.token || req.get('Authorization').slice(7);
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'User not logged in'
        });
      }
      req.userId = decoded.id;
      return next();
    });
  }

  static validateParams(req, res, next) {
    const reqId = req.params.id;
    const id = isInt(reqId);

    if (!id || (Math.sign(reqId) === -1)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
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

    if (typeof email !== 'string') {
      errors.message = 'Must be a string';
    } else if (!email || (email && !validator.isEmail(email))) {
      errors.message = 'Enter a valid email';
    }

    if (typeof password !== 'string') {
      errors.message = 'Must be a string';
    } else if (!password) {
      errors.message = 'password cannot be empty';
    } else if (password && password.includes(' ')) {
      errors.message = 'password cannot contain spaces';
    }

    if (password.length < 5) {
      errors.message = 'password must be more than 5 characters';
    }

    if (isEmpty(errors)) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      code: 400,
      errors
    });
  }

  static validateEntry(req, res, next) {
    const errors = {};
    const {
      title, category, image, story
    } = req.body;

    if (typeof title !== 'string' || typeof category !== 'string' || typeof image !== 'string' || typeof story !== 'string') {
      errors.message = 'values must be a text';
    } else if (!title || (title && validator.isEmpty(title.trim()))) {
      errors.message = 'Title is required';
    } else if (!category || (category && validator.isEmpty(category.trim()))) {
      errors.message = 'Category is required';
    } else if (!image || (image && validator.isEmpty(image.trim()))) {
      errors.message = 'Image is required';
    } else if (!story || (story && validator.isEmpty(story.trim()))) {
      errors.message = 'Story is required';
    }

    if (isEmpty(errors)) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      code: 400,
      errors
    });
  }

  static validateProfile(req, res, next) {
    const errors = {};
    const {
      password, firstname, lastname, sex, bio, notification
    } = req.body;

    if (password && password.includes(' ')) {
      errors.message = 'password cannot contain spaces';
    }

    if (password && (password.length < 5)) {
      errors.message = 'password must be more than 5 characters';
    }

    if ((firstname && typeof firstname !== 'string') || (lastname && typeof lastname !== 'string') || (bio && typeof bio !== 'string')) {
      errors.message = 'values must be a text';
    } else if ((firstname && validator.isEmpty(firstname.trim())) || (lastname && validator.isEmpty(lastname.trim())) || (bio && validator.isEmpty(bio.trim()))) {
      errors.message = 'values cannot be empty';
    }

    if ((typeof sex !== 'boolean') || (typeof notification !== 'boolean')) {
      errors.message = 'values must be a boolean';
    }

    if (isEmpty(errors)) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      code: 400,
      errors
    });
  }
}
