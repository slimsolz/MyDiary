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

  /*
  static validateProfie(req, res, next) {
    const {
      password, firstname, lastname, sex, bio, notification
    } = req.body;
    const errors = {};

    if (password && validator.isEmpty(password.trim())) {
      errors.password = 'password cannot be empty';
    }

    if (firstname && typeof firstname !== 'string') {
      errors.firstname = 'Enter a valid firstname';
    }

    if (lastname && typeof lastname !== 'string') {
      errors.lastname = 'Enter a valid lastname';
    }

    if (sex && typeof sex !== 'string') {
      errors.sex = 'Enter a valid sex';
    }

    if (notification && typeof notification !== 'string') {
      errors.notification = 'Enter a valid notification';
    }

    if (bio && typeof bio !== 'string') {
      errors.bio = 'Enter a valid bio';
    }

    if (isEmpty(errors)) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      errors
    });
  }
  */

  static validateEntry(req, res, next) {
    const errors = {};
    const {
      title, category, image, story
    } = req.body;

    if (!title || (title && validator.isEmpty(title.trim()))) {
      errors.title = 'Title is required';
    }

    if (!category || (category && validator.isEmpty(category.trim()))) {
      errors.category = 'Category is required';
    }

    if (!image || (image && validator.isEmpty(image.trim()))) {
      errors.image = 'Image is required';
    }

    if (!story || (story && validator.isEmpty(story.trim()))) {
      errors.story = 'Story is required';
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
