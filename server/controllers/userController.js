import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../dbconnect/db-connect';

require('dotenv').config();

export default class UserController {
  static signup(req, res) {
    const {
      email, password
    } = req.body;

    db.result(`SELECT * FROM users WHERE email = '${email.trim().toLowerCase()}' LIMIT 1`)
      .then((userExists) => {
        if (userExists.rowCount > 0) {
          return res.status(409).json({
            status: 'error',
            message: 'Account exists'
          });
        }

        const hash = bcrypt.hashSync(password, 10);
        db.result(`INSERT INTO users(email, password) VALUES('${email}', '${hash}') RETURNING id, email, password`)
          .then((user) => {
            const token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET, { expiresIn: '24h' });
            return res.status(201).json({
              status: 'success',
              message: 'User created and logged in',
              token,
              user: {
                email: user.rows[0].email
              }
            });
          });
      });
  }
}

