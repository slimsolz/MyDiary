import validator from 'validator';
import isEmpty from 'lodash.isempty';
import isInt from 'validator/lib/isInt';

export default class Middleware {
	static validateUser(req, res, next) {
		const errors = {};
		const {
			email, password
		} = req.body;

		if (!email || (email && !validator.isEmail(email))) {
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
