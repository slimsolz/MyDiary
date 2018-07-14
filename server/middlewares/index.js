import validator from 'validator';
import isEmpty from 'lodash.isempty';

export default class Middleware {
  static validateUser(req, res, next) {
    const errors = {};
    const {
      email, password
    } = req.body;

    if (!email || (email && !isNaN(email))) {
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
