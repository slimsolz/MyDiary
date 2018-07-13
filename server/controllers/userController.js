import db from '../models/dummy-db';

export default class UserController {
  static createUser(req, res) {
    const {
      email, password
    } = req.body;

    const newUser = {
      id: db.users[db.users.length - 1].id + 1,
      email,
      password
    };

    const userfound = db.users.find(user => user.email === email);
    if (userfound) {
      return res.status(409).json({
        status: 'error',
        message: 'user already exists'
      });
    }

    db.users.push(newUser);
    return res.status(201).json({
      status: 'success',
      message: 'user created successfully',
      user: newUser
    });
  }
}
