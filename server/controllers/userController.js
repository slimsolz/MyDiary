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

  static signin(req, res) {
    const client = new Client(connectionString);
    client.connect();
    const {
      email, password
    } = req.body;

    const finduserquery = {
      text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
      values: [email.trim().toLowerCase()]
    };

    client.query(finduserquery, (err, user) => {
      client.end();
      if (user.rowCount === 0) {
        return res.status(401).json({
          status: 'error',
          message: 'Incorrect Email or password'
        });
      }

      const correctpassword = bcrypt.compareSync(password, user.rows[0].password);
      if (!correctpassword) {
        return res.status(401).json({
          status: 'error',
          message: 'Incorrect Email or password'
        });
      }

      const token = jwt.sign({ id: user.rows[0] }, process.env.SECRET, { expiresIn: '3h' });
      return res.status(200).json({
        status: 'success',
        message: 'logged in',
        token,
        user: {
          email: user.rows[0].email
        }
      });
    });
  }

  static viewProfile(req, res) {
    const client = new Client(connectionString);
    client.connect();
    const { userId } = req;

    const userquery = {
      text: 'SELECT * FROM users WHERE id = $1 LIMIT 1',
      values: [userId]
    };

    client.query(userquery, (err, user) => {
      client.end();
      const {
        email, firstname, lastname, sex, bio, notification
      } = user.rows[0];

      return res.status(200).json({
        status: 'success',
        message: 'User profile reterived',
        profile: {
          email,
          firstname,
          lastname,
          sex,
          bio,
          notification
        }
      });
    });
  }

  static updateProfile(req, res) {
    const client = new Client(connectionString);
    client.connect();
    const { userId } = req;
    const {
      password, firstname, lastname, sex, bio, notification
    } = req.body;

    const userquery = {
      text: 'SELECT * FROM users WHERE id = $1 LIMIT 1',
      values: [userId]
    };

    client.query(userquery, (err, user) => {
      const newPassword = password ? bcrypt.hashSync(password, 10) : user.rows[0].password;

      const updatequery = `UPDATE users SET password = '${newPassword}', firstname = '${firstname}', lastname = '${lastname}', sex = '${sex}', bio = '${bio}', notification = '${notification}' WHERE id = ${userId} RETURNING *`;
      client.query(updatequery, (error, updatedUser) => {
        client.end();
        return res.status(200).json({
          status: 'success',
          message: 'Profile updated successfully',
          user: {
            email: updatedUser.rows[0].email,
            firstname: updatedUser.rows[0].firstname,
            lastname: updatedUser.rows[0].lastname,
            sex: updatedUser.rows[0].sex,
            bio: updatedUser.rows[0].bio,
            notification: updatedUser.rows[0].notification
          }
        });
      });
    });
  }
}
