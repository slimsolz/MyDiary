import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Client } from 'pg';
import config from '../config/config';

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const connectionString = config[env];

export default class UserController {
  static signup(req, res) {
    const client = new Client(connectionString);
    client.connect();
    const {
      email, password
    } = req.body;

    const finduserquery = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email.trim().toLowerCase()]
    };

    client.query(finduserquery, (err, result) => {
      if (result.rowCount !== 0) {
        return res.status(409).json({
          status: 'error',
          message: 'Account exists'
        });
      }

      const hash = bcrypt.hashSync(password, 10);
      const createuserquery = `INSERT INTO users(email, password) VALUES('${email}', '${hash}') RETURNING id, email, password`;

      client.query(createuserquery, (error, user) => {
        client.end();
        const { id } = user.rows[0];
        const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '3h' });
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
