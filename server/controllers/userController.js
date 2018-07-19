import db from '../models/dummy-db';

export default class UserController {
  static signup(req, res) {
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

  static signin(req, res) {
    const {
      email, password
    } = req.body;

    const userfound = db.users.find(user => (user.email === email) && (user.password === password));
    if (!userfound) {
      return res.status(401).json({
        status: 'error',
        message: 'username or password incorrect'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'logged in successfully',
      user: userfound
    });
  }

  static updateProfile(req, res) {
    const userId = parseInt(req.params.id, 10);
    const {
      password, firstname, lastname, sex, bio, notification
    } = req.body;

    const userfound = db.users.find(user => user.id === userId);
    const userfoundIndex = db.users.findIndex(user => user.id === userId);

    if (userfoundIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    const updatedUser = {
      id: userId,
      email: userfound.email,
      password: password || userfound.password,
      firstname,
      lastname,
      sex,
      bio,
      notification
    };

    db.users.splice(userfoundIndex, 1, updatedUser);
    return res.status(200).json({
      status: 'success',
      message: 'User profile updated successfully',
      user_profile: updatedUser
    });
  }

  static viewProfile(req, res) {
    const userId = parseInt(req.params.id, 10);

    const userfound = db.users.filter(user => user.id === userId);
    if (userfound.length < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found'
      });
    }

    return res.json({
      status: 'success',
      message: 'User profile reterived',
      user: userfound
    });
  }
}

